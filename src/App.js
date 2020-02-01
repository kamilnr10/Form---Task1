import React, { Component } from "react";
import "./App.css";
import RegistrationForm from "./forms";

const TempComponent = ({ text }) => {
  return <h1>{text}</h1>;
};

function App() {
  return (
    <div className="App">
      <TempComponent text="Zadanie - Formularz" />
      <RegistrationForm />
    </div>
  );
}

export default App;
