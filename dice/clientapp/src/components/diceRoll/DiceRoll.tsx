import React, { useState, useEffect } from "react";
import { match } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import DiceRollForm from "./DiceRollForm";
import DiceRollList from "./DiceRollList";
import ConnectionState from "./ConnectionState";

interface DiceRollParams {
  sessionId: string;
}

interface DiceRollProps {
  required: string;
  match: match<DiceRollParams>;
}

const DiceRoll = ({ match }: DiceRollProps) => {
  const sessionId = match.params.sessionId;

  const [connectionState, setConnectionState] = useState("connecting");
  const [hubConnection, setHubConnection] = useState<signalR.HubConnection>();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Trace)
      .withUrl("/hubs/dice")
      .withAutomaticReconnect()
      .build();

    const startSuccess = () => {
      setConnectionState("connected");
      joinSession();
    };

    const startFailed = () => {
      setConnectionState("failed");
    };

    const joinSession = () => {
      connection.send("joinSession", sessionId);
    };

    connection.onreconnecting(function () {
      setConnectionState("reconnecting");
    });

    connection.onreconnected(function () {
      joinSession();
      setConnectionState("connected");
    });

    connection.onclose(function () {
      setConnectionState("disconnected");
    });

    connection.on("diceRoll", (response) => {
      console.log("ROLL!!");
    });

    connection.start().then(startSuccess, startFailed);

    setHubConnection(connection);

    return function cleanup() {
      connection.stop();
    };
  }, []);

  return (
    <>
      <ConnectionState connectionState={connectionState} />
      {hubConnection && <DiceRollForm connection={hubConnection} sessionId={match.params.sessionId} />}
      {hubConnection && <DiceRollList connection={hubConnection}></DiceRollList>}
    </>
  );
};

export default DiceRoll;
