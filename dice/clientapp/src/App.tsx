import React from "react";
import "./App.css";
import * as signalR from "@microsoft/signalr";
import DiceRollForm from "./components/diceRoll/DiceRollForm"
import DiceRollList from "./components/diceRoll/DiceRollList"

const App: React.FC = () => {
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/diceRolls")
    .build();

  hubConnection.start();

  return (
    <>
      <DiceRollForm />
      <DiceRollList HubConnection={hubConnection}></DiceRollList>
    </>
  );
};

export default App;