import React, { FC, useState, useEffect } from "react";

interface DiceRollFormProps {
  connection: signalR.HubConnection;
}

const DiceRollForm = ({connection}:DiceRollFormProps) => {
  const [dieCount, setDieCount] = useState(4);
  const [faceCount, setFaceCount] = useState(10);
  const [name, setName] = useState("Al Paca");

  const dieCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDieCount(+event.target.value);
  };

  const faceCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaceCount(+event.target.value);
  };

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const messageSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    connection.send("roll", name, dieCount, faceCount);
  };

  return (
    <>
      <form>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="name"
              required
              placeholder="Al Paca"
              value={name}
              onChange={nameChange}
            />
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="numberOfDice">
              Number of Dice
            </label>
            <div className="input-group mb-2">
              <input
                type="number"
                className="form-control"
                id="numberOfDice"
                placeholder="5"
                min="1"
                max="25"
                value={dieCount}
                onChange={dieCountChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">x</div>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="faceCount">
              Number of Faces
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">d</div>
              </div>
              <input
                type="number"
                className="form-control"
                id="faceCount"
                placeholder="6"
                min="2"
                max="100"
                value={faceCount}
                onChange={faceCountChange}
              />
            </div>
          </div>

          <div className="col-auto">
            <button className="btn btn-primary mb-2" onClick={messageSubmit}>
              Roll
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DiceRollForm;
