import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import CreateEventForm from "./components/CreateEventForm";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/create-event" element={<CreateEventForm />} />
      </Routes>
    </>
  );
};

export default App;
