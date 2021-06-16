import React, { FC, useState, useEffect, useReducer } from "react";

interface DiceRollFormProps {
  connection: signalR.HubConnection;
}

interface State {
  value: number
  isValid: boolean
  wasTouched?: boolean
}

type Action =
 | { type: 'USER_INPUT', value: number }
 | { type: 'INPUT_BLUR' }


const diceFaceValueReducer = (state: State, action: Action): State => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value >= 1 && action.value <= 100, wasTouched: true };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: +state.value, isValid: state.value >= 1 && state.value <= 100, wasTouched: true };
  }

  return { value: 6, isValid: false, wasTouched: true };
};

const DiceRollForm = ({ connection }: DiceRollFormProps) => {
  const [rollIsValid, setRollIsValid] = useState(false);

  const [dieCountState, dispatchDieCount] = useReducer(diceFaceValueReducer, { value: 1, isValid: true, wasTouched: false });
  const [faceCountState, dispatchFaceCount] = useReducer(diceFaceValueReducer, { value: 6, isValid: true, wasTouched: false });

  const { isValid: dieCountIsValid } = dieCountState;
  const { isValid: faceCountIsValid } = faceCountState;

  const dieCountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchDieCount({ type: "USER_INPUT", value: +event.target.value });
  };

  const dieCountBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchDieCount({ type: "INPUT_BLUR" });
  };

  const faceCountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFaceCount({ type: "USER_INPUT", value: +event.target.value });
  };

  const faceCountBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFaceCount({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    connection.send("roll", "al paca", dieCountState.value, faceCountState.value);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setRollIsValid(dieCountIsValid && faceCountIsValid);
    }, 100);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [dieCountIsValid, faceCountIsValid]);

  return (
    <>
      <form onSubmit={submitHandler} noValidate>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="dieCount">
              Number of Dice
            </label>
            <div className="input-group mb-2">
              <input
                type="number"
                id="dieCount"
                placeholder="10"
                min="1"
                max="100"
                value={dieCountState.value}
                onChange={dieCountChangeHandler}
                onBlur={dieCountBlurHandler}
                className={`form-control ${dieCountState.wasTouched ? (dieCountState.isValid === false ? "is-invalid" : "is-valid") : ""}`}
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
                id="faceCount"
                placeholder="10"
                min="1"
                max="100"
                value={faceCountState.value}
                onChange={faceCountChangeHandler}
                onBlur={faceCountBlurHandler}
                className={`form-control ${faceCountState.wasTouched ? (faceCountState.isValid === false ? "is-invalid" : "is-valid") : ""}`}
              />
            </div>
          </div>

          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-2" disabled={!rollIsValid}>
              Roll
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DiceRollForm;