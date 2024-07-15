"use client";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
    <BrowserRouter> 
    <App />
    </BrowserRouter>
);

//const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
//root.render(
  // <BrowserRouter> 
    //<App />
    //</BrowserRouter>
//);
