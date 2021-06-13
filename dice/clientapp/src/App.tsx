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

  var list: Array<RollResponse> = [];

  interface MessageProps {
    HubConnection: signalR.HubConnection;
  }

  interface RollResponse {
    name: string,
    roll: Array<number>
  }

  const Messages: React.FC<MessageProps> = (messageProps) => {
    const [date, setDate] = useState<Date>();

    useEffect(() => {
      messageProps.HubConnection.on("sendNewDiceRoll", (response) => {

        list.push(JSON.parse(response));

        while (list.length > 10) {
          var item = list.shift();
          console.debug('Evicting an item from the list', item);
        }

        setDate(new Date());
      });
    }, []);

    return (
      <>
        {list.map((item, index) => (
          <p key={`message${index}`}>{item.name} rolled {item.roll.sort((n1,n2) => n2 - n1).join(', ')}</p>
        ))}
      </>
    );
  };

  const SendMessage: React.FC = () => {
    const [dieCount, setDieCount] = useState("4");
    const [faceCount, setFaceCount] = useState("10");
    const [name, setName] = useState("Al Paca");

    const dieCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && event.target) {
        setDieCount(event.target.value);
      }
    };

    const faceCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && event.target) {
        setFaceCount(event.target.value);
      }
    };

    const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && event.target) {
        setName(event.target.value);
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
            "name": name,
            "dieCount": dieCount,
            "faceCount": faceCount
          }),
        });
      }
    };

    return (
      <>
        <label>name</label>
        <input type="text" required onChange={nameChange} value={name} />

        <label>dice</label>
        <input type="number" required onChange={dieCountChange} value={dieCount} />

        <label>faces</label>
        <input type="number" required onChange={faceCountChange} value={faceCount} />

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