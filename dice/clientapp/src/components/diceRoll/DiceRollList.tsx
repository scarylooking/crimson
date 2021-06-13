import React, { FC, useState, useEffect } from 'react';
import DiceRollItem from "./DiceRollItem"

interface MessageProps {
  HubConnection: signalR.HubConnection;
}

interface RollResponse {
  name: string,
  roll: Array<number>
}

const list: Array<RollResponse> = [];

const DiceRollList: FC<MessageProps> = (messageProps) => {
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
        <DiceRollItem name={item.name} roll={item.roll} index={index}></DiceRollItem>
      ))}
    </>
  );
};

export default DiceRollList;