import React, { FC, useState, useEffect } from 'react';
import DiceRollItem from "./DiceRollItem"
import { DiceRollResponse } from '../Interfaces/DiceRollResponse'

interface DiceRollListProps {
  connection: signalR.HubConnection;
}

const list: Array<DiceRollResponse> = [];

const DiceRollList = ({ connection }: DiceRollListProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    connection.on("diceRoll", (response) => {

      list.unshift(JSON.parse(response));

      while (list.length > 10) {
        var item = list.pop();
        console.debug('Evicting an item from the list', item);
      }

      setDate(new Date());
    });
  }, []);

  return (
    <>
      <table className="table table-condensed table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Player</th>
            <th scope="col">Die</th>
            <th scope="col">Roll</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item: DiceRollResponse) => (
            <DiceRollItem key={item.id} roll={item} ></DiceRollItem>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DiceRollList;