import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { InitiateAuthCommand, UserNotFoundException, UserNotConfirmedException, NotAuthorizedException, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { UserContext } from "../../context/UserContext";
import "./SignIn.css";
import { cognitoClient } from "../../Aws";
import DialogComponent from "../Dialog";

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

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setLoggedInUser } = useContext<any>(UserContext);
  const [showDialog, setShowDialog] = useState(false);
  const closeDialog = () => setShowDialog(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        let accessToken: string | undefined;
        
        await cognitoClient.send(command)
            .then((data) => {
                if (data.$metadata.httpStatusCode === 200) {
                    accessToken = data.AuthenticationResult?.AccessToken;
                    setTitle("Success");
                    setContent("You have signed into your account.");
                    setShowDialog(true);
                }
            });

        if (accessToken) {
            const getUser = new GetUserCommand({ AccessToken: accessToken });
            await cognitoClient.send(getUser)
                .then((data) => {
                    if (data.$metadata.httpStatusCode === 200) {
                        setLoggedInUser({ accessToken: accessToken, username: data.UserAttributes ? data.UserAttributes[0].Value : "", admin: data.UserAttributes ? data.UserAttributes[2].Value : "false" });
                        window.sessionStorage.setItem("accessToken", accessToken ?? "");
                    }
                })
                .catch(() => {
                    setTitle("Error");
                    setContent("Something went wrong. Please try again later.")
                    setShowDialog(true);
                });
            }
    }
    catch (e) {
        if (e instanceof UserNotConfirmedException) {
            setTitle("Account not confirmed");
            setContent("You need to confirm your account before signing in, please check your email inbox or spam folder for the confirmation email");
            setShowDialog(true);
        }
        else if (e instanceof UserNotFoundException) {
            setTitle("Account not found");
            setContent("It seems you do not have an account to be able to sign in. Make sure to sign up first.");
            setShowDialog(true);
        }
        else if (e instanceof NotAuthorizedException) {
            setTitle("Error");
            setContent("Incorrect username or password");
            setShowDialog(true);
        }
        else {
            setTitle("Server Error");
            setContent("Something went wrong. Please try again later.");
            setShowDialog(true);
        }
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
      <DialogComponent open={showDialog} title={title} content={content} close={closeDialog}/>
    </>
  );
}
