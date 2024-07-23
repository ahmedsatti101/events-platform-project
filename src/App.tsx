import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import CreateEventForm from "./components/CreateEventFrom/CreateEventForm";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import ViewAllEvents from "./components/Events/Events";
import SingleEvent from "./components/SingleEvent/SingleEvent";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ViewAllEvents />} />
        <Route path="/create-event" element={<CreateEventForm />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/events/:event_id" element={<SingleEvent />} />
      </Routes>
    </>
  );
};

export default App;
