// App.tsx
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as signalR from "@microsoft/signalr";

const App: React.FC = () => {
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/message")
    .build();

  hubConnection.start();

  var list: string[] = [];

  interface MessageProps {
    HubConnection: signalR.HubConnection;
  }

  const Messages: React.FC<MessageProps> = (messageProps) => {
    const [date, setDate] = useState<Date>();

    useEffect(() => {
      messageProps.HubConnection.on("sendToReact", (message) => {
        list.push(message);
        setDate(new Date());
      });
    }, []);

    return (
      <>
        {list.map((message, index) => (
          <p key={`message${index}`}>{message}</p>
        ))}
      </>
    );
  };

  const SendMessage: React.FC = () => {
    const [numberOfDice, setNumberOfDice] = useState("1");
    const [numberOfFaces, setNumberOfFaces] = useState("6");

    const numberOfDiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && event.target) {
        setNumberOfDice(event.target.value);
      }
    };

    const numberOfFacesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && event.target) {
        setNumberOfFaces(event.target.value);
      }
    };

    const messageSubmit = (event: React.MouseEvent) => {
      if (event) {
        fetch("/api/roll", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "numberOfDice": numberOfDice,
            "numberOfFaces": numberOfFaces
          }),
        });
      }
    };

    return (
      <>
        <label>dice</label>
        <input type="number" onChange={numberOfDiceChange} value={numberOfDice} />

        <label>faces</label>
        <input type="number" onChange={numberOfFacesChange} value={numberOfFaces} />

        <button onClick={messageSubmit}>Add Message</button>
      </>
    );
  };

  return (
    <>
      <SendMessage />
      <Messages HubConnection={hubConnection}></Messages>
    </>
  );
};

export default App;
