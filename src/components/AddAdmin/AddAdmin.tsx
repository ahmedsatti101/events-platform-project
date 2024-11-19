import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddAdmin.css";
import { AdminUpdateUserAttributesCommand, UserNotFoundException } from "@aws-sdk/client-cognito-identity-provider";
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
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function AddAdmin() {
  const [email, setEmail] = useState<string>("");
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
    const command = new AdminUpdateUserAttributesCommand({Username: email, UserPoolId: process.env.REACT_APP_USER_POOL_ID || "", UserAttributes: [
        {
            Name: "custom:admin",
            Value: "true"
        }
    ]});
    
    await cognitoClient.send(command)
        .then(data => {
            if (data.$metadata.httpStatusCode === 200) {
                setTitle("Success");
                setContent("User has been made an admin");
                setShowDialog(true);
            }})
        .catch(e => {
            if (e instanceof UserNotFoundException) {
                setTitle("User not found");
                setContent("This user does not exist");
                setShowDialog(true);
            }
            else {
                setTitle("Server error");
                setContent("Error adding user as admin. Please try again later.");
                setShowDialog(true);
            }
         })
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          title="email"
          {...register("email")}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="admin-email-input"
        />
        <p id="error-text">{errors.email?.message}</p>
        <button type="submit" id="add-admin-button">
          Submit
        </button>
      </form>
      <DialogComponent title={title} content={content} open={showDialog} close={closeDialog}/>
    </>
  );
}
