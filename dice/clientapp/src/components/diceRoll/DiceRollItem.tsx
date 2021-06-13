import React, { FC, useState, useEffect } from 'react';

interface MessageProps {
  HubConnection: signalR.HubConnection;
}

interface RollItem {
  index: number,
  name: string,
  roll: Array<number>
}


const DiceRollItem: FC<RollItem> = ({name, roll, index}) => {
  return (
    <>
        <p key={index}>{name} rolled {roll.sort((n1, n2) => n2 - n1).join(', ')}</p>
    </>
  );
};

export default DiceRollItem;