import React, {FC} from "react";
import { match } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import DiceRollForm from "./DiceRollForm";
import DiceRollList from "./DiceRollList";
import { connectAdvanced } from "react-redux";

interface DiceRollParams {
  sessionId: string;
}

interface DiceRollProps {
  required: string;
  match: match<DiceRollParams>;
}

const DiceRoll = ({match}:DiceRollProps) => {

  const startSuccess = () => {
    console.log("CONNECTED!")

    hubConnection.send("joinSession", match.params.sessionId)
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
      <DiceRollForm connection={hubConnection} sessionId={match.params.sessionId} />
      <DiceRollList connection={hubConnection}></DiceRollList>
    </>
  );
};

export default DiceRoll;