import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import CreateEventForm from "./components/CreateEventFrom/CreateEventForm";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/create-event" element={<CreateEventForm />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
