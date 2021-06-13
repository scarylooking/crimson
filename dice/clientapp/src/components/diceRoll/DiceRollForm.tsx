import React, { FC, useState, useEffect } from 'react';

const DiceRollForm: FC = () => {
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

export default DiceRollForm;