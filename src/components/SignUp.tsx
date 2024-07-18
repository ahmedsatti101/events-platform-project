import React from "react";

export default function SignUp() {
    return (
        <form>
            <h2>Create account</h2>
            <label htmlFor="email">Email:</label>
            <input type="text" title="email"/><br />

            <label htmlFor="password">Password:</label>
            <input type="text" title="password"/><br />

            <button type="submit">Sign up</button>
        </form>
    );
}