import React, { FC, useState, useEffect } from "react";
import { DiceRollResponse } from "../Interfaces/DiceRollResponse";

interface DiceRollItemProps {
  roll: DiceRollResponse;
}

const DiceRollItem = ({ roll }: DiceRollItemProps) => {
  return (
    <>
      <tr>
        <th scope="row">{roll.id.substr(roll.id.length - 5).toUpperCase()}</th>
        <td>{roll.name}</td>
        <td>{roll.die}D{roll.faces}</td>
        <td>{roll.roll.sort((n1, n2) => n2 - n1).join(", ")}</td>
      </tr>
    </>
  );
};

export default DiceRollItem;
