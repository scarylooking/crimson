import React, {FC} from "react";
import * as signalR from "@microsoft/signalr";
import DiceRollForm from "./DiceRollForm";
import DiceRollList from "./DiceRollList";

const DiceRoll: FC = () => {
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

export default DiceRoll;