import React, { FC, useState, useEffect } from "react";
import { DiceRollResponse } from "../Interfaces/DiceRollResponse";
import styles from './DiceRollItem.module.css'; 

interface DiceRollItemProps {
  roll: DiceRollResponse;
}

const DiceRollItem = ({ roll }: DiceRollItemProps) => {

  const GetBadgeType = (dieFaces:number, roll:number) => {
    if (roll === 1) {
      return "badge-danger";
    }

    if (roll === dieFaces) {
      return "badge-success";
    }

    return "badge-light";
  }

  return (
    <>
      <tr>
        <th scope="row">{roll.id.substr(roll.id.length - 5).toUpperCase()}</th>
        <td>{roll.name}</td>
        <td>
          {roll.die}d{roll.faces}
        </td>
        <td className="w-50">
          {roll.roll
            .sort((n1, n2) => n2 - n1)
            .map((item: number) => (
              <span 
              className={`badge ${styles['fixed-width-badge']} mr-1 ${GetBadgeType(roll.faces, item)}`}>{item}</span>
            ))}
        </td>
      </tr>
    </>
  );
};

export default DiceRollItem;
