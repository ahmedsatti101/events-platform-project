import React from "react";

export default function SignIn() {
    return (
        <form>
            <h2>Sign in</h2>
            <label htmlFor="email">Email:</label>
            <input type="text" title="email"/><br />

            <label htmlFor="password">Password:</label>
            <input type="text" title="password"/><br />

            <button type="submit">Sign in</button>
        </form>
    );
}