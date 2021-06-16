import React, {FC} from "react";
import * as signalR from "@microsoft/signalr";
import DiceRollForm from "./DiceRollForm";
import DiceRollList from "./DiceRollList";

const DiceRoll = () => {

  const startSuccess = () => {
    console.log("CONNECTED!")
  }

  const startFailed = () => {
    console.log("FAILED!")
  }

  const hubConnection = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/dice")
    .withAutomaticReconnect()
    .build();

  hubConnection.start().then(startSuccess, startFailed);

  return (
    <>
      <DiceRollForm connection={hubConnection} />
      <DiceRollList connection={hubConnection}></DiceRollList>
    </>
  );
};

export default DiceRoll;