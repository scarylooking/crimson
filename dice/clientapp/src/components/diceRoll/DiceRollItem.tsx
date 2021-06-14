import React, { FC, useState, useEffect } from "react";
import { DiceRollResponse } from "../Interfaces/DiceRollResponse";

interface DiceRollItemProps {
  roll: DiceRollResponse;
}

const DiceRollItem = ({roll}:DiceRollItemProps) => {
  return (
    <>
      <p>
        {roll.name} rolled {roll.die}D{roll.faces}:{" "}
        {roll.roll.sort((n1, n2) => n2 - n1).join(", ")}
      </p>
    </>
  );
};

export default DiceRollItem;
