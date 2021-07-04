import React, { useState, useEffect } from 'react';
import DiceRollItem from './DiceRollItem';
import { DiceRollResponse } from '../../Interfaces/DiceRollResponse';

interface DiceRollListProps {
  connection: signalR.HubConnection;
}

const DiceRollList = ({ connection }: DiceRollListProps) => {
  const [itemList, setItemList] = useState<Array<DiceRollResponse>>([]);

  useEffect(() => {
    connection.on('roll', (response) => {
      setItemList((items) => {
        while (items.length > 10) {
          var item = items.pop();
          console.debug('Evicting an item from the list', item);
        }
        return [response, ...items];
      });
    });
  }, [connection]);

  return (
    <>
      <table className='table table-condensed table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Player</th>
            <th scope='col'>Die</th>
            <th scope='col' className='w-50'>
              Roll
            </th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item: DiceRollResponse) => (
            <DiceRollItem isFirst={item.id === itemList[0].id} key={item.id} roll={item}></DiceRollItem>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DiceRollList;
