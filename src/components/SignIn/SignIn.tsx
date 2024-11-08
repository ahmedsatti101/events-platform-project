import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CognitoIdentityProviderClient, InitiateAuthCommand, UserNotFoundException, UserNotConfirmedException, NotAuthorizedException, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { UserContext } from "../../context/UserContext";
import "./SignIn.css";

const schema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .required("Email required"),
    password: yup.string().required("Password required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type InitiateAuthCommandInput = "USER_PASSWORD_AUTH";

const client = new CognitoIdentityProviderClient({ region: "eu-west-2", credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID ? process.env.REACT_APP_ACCESS_KEY_ID : "",
    secretAccessKey: process.env.REACT_APP_SECERT_ACCESS_KEY ? process.env.REACT_APP_SECERT_ACCESS_KEY : ""
}});

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loggedInUser ,setLoggedInUser } = useContext<any>(UserContext);
  const [accessToken, setAccessToken] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
        const input = {
          "AuthFlow": "USER_PASSWORD_AUTH" as InitiateAuthCommandInput,
          "AuthParameters": {
            "PASSWORD": password,
            "USERNAME": email
          },
          "ClientId": process.env.REACT_APP_COGNITO_CLIENT_ID ? process.env.REACT_APP_COGNITO_CLIENT_ID : ""
        }; 

        const command = new InitiateAuthCommand(input);
        
        await client.send(command)
            .then((data) => {
                if (data.$metadata.httpStatusCode === 200) {
                    setAccessToken(data.AuthenticationResult?.AccessToken);
                    alert("You have signed in")
                }
            });

        if (accessToken) {
            const getUser = new GetUserCommand({ AccessToken: accessToken });
            await client.send(getUser)
                .then((data) => {
                    if (data.$metadata.httpStatusCode === 200) {
                        window.sessionStorage.setItem("username", data.UserAttributes?.[0]?.Value ?? "");
                        window.sessionStorage.setItem("accessToken", accessToken);
                    }
                })
                .catch(e => console.log(e));
            }
    }
    catch (e) {
        if (e instanceof UserNotConfirmedException) alert("You need to confirm your account before signing in, please check your email inbox or spam folder for the confirmation email");
        else if (e instanceof UserNotFoundException) alert("It seems you do not have an account to be able to sign in. Make sure to sign up first.")
        else if (e instanceof NotAuthorizedException) alert("Incorrect username or password");
        else alert("Error signing in. Please try again later.");
    }
  };

  return (
    <>
      <h2 id="sign-in-title">Sign in</h2>
      <section id="sign-in-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          data-testid="sign-in-form"
        >
          <label htmlFor="email" data-testid="email-test">
            Email:
          </label>
          <br />
          <input
            type="email"
            title="email"
            {...register("email")}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="input-email"
          />
          <p id="error-text">{errors.email?.message}</p>
          <br />

          <label htmlFor="password" data-testid="password-test">
            Password:
          </label>
          <input
            type="password"
            title="password"
            {...register("password")}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="input-password"
          />
          <p id="error-text">{errors.password?.message}</p>
          <br />

          <button type="submit" id="sign-in-button">
            Sign in
          </button>
        </form>
      </section>
    </>
  );
}
