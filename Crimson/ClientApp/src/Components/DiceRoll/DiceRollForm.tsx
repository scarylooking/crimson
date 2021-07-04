import React, { useState, useEffect, useReducer } from 'react';
import { HubConnectionState, HubConnection } from '@microsoft/signalr';

interface DiceRollFormProps {
  connection: HubConnection;
  sessionId: string;
  connectionState: HubConnectionState;
}

interface State<T> {
  value: T;
  isValid: boolean;
  wasTouched?: boolean;
}

type Action<T> = { type: 'USER_INPUT'; value: T } | { type: 'INPUT_BLUR' };

const diceFaceValueReducer = (state: State<number>, action: Action<number>): State<number> => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value >= 1 && action.value <= 100, wasTouched: true };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: +state.value, isValid: state.value >= 1 && state.value <= 100, wasTouched: true };
  }

  return { value: 6, isValid: false, wasTouched: true };
};

const stringValueReducer = (state: State<string>, action: Action<string>): State<string> => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.length >= 1 && action.value.length <= 50, wasTouched: true };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.length >= 1 && state.value.length <= 50, wasTouched: true };
  }

  return { value: '', isValid: false, wasTouched: true };
};

const DiceRollForm = ({ connection, sessionId, connectionState }: DiceRollFormProps) => {
  const [rollIsValid, setRollIsValid] = useState(false);

  const [dieCountState, dispatchDieCount] = useReducer(diceFaceValueReducer, { value: 1, isValid: true, wasTouched: false });
  const [faceCountState, dispatchFaceCount] = useReducer(diceFaceValueReducer, { value: 6, isValid: true, wasTouched: false });
  const [nameState, dispatchName] = useReducer(stringValueReducer, { value: '', isValid: false, wasTouched: false });

  const { isValid: dieCountIsValid } = dieCountState;
  const { isValid: faceCountIsValid } = faceCountState;
  const { isValid: nameIsValid } = nameState;

  const dieCountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchDieCount({ type: 'USER_INPUT', value: +event.target.value });
  };

  const dieCountBlurHandler = (_: React.ChangeEvent<HTMLInputElement>) => {
    dispatchDieCount({ type: 'INPUT_BLUR' });
  };

  const faceCountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFaceCount({ type: 'USER_INPUT', value: +event.target.value });
  };

  const faceCountBlurHandler = (_: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFaceCount({ type: 'INPUT_BLUR' });
  };

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchName({ type: 'USER_INPUT', value: event.target.value });
  };

  const nameBlurHandler = (_: React.ChangeEvent<HTMLInputElement>) => {
    dispatchName({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (connection.state === HubConnectionState.Connected) {
      connection.send('roll', sessionId, nameState.value, dieCountState.value, faceCountState.value);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setRollIsValid(dieCountIsValid && faceCountIsValid && nameIsValid && connectionState === HubConnectionState.Connected);
    }, 100);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [dieCountIsValid, faceCountIsValid, nameIsValid, connectionState]);

  return (
    <>
      <form onSubmit={submitHandler} noValidate className='needs-validation'>
        <div className='form-row align-items-center'>
          <div className='col-md-4'>
            <label className='sr-only' htmlFor='name'>
              Name
            </label>
            <div className='input-group mb-2'>
              <input
                type='text'
                id='name'
                value={nameState.value}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                className={`form-control ${nameState.wasTouched ? (nameState.isValid === false ? 'is-invalid' : 'is-valid') : 'is-invalid'}`}
                placeholder='Al Paca'
              />
            </div>
          </div>

          <div className='col-3'>
            <label className='sr-only' htmlFor='dieCount'>
              Number of Dice
            </label>
            <div className='input-group mb-2'>
              <input
                type='number'
                id='dieCount'
                placeholder='10'
                min='1'
                max='100'
                value={dieCountState.value}
                onChange={dieCountChangeHandler}
                onBlur={dieCountBlurHandler}
                className={`form-control ${dieCountState.wasTouched ? (dieCountState.isValid === false ? 'is-invalid' : 'is-valid') : 'is-valid'}`}
              />
              <div className='input-group-append'>
                <div className='input-group-text'>x</div>
              </div>
            </div>
          </div>

          <div className='col-3'>
            <label className='sr-only' htmlFor='faceCount'>
              Number of Faces
            </label>
            <div className='input-group mb-2'>
              <div className='input-group-prepend'>
                <div className='input-group-text'>d</div>
              </div>
              <input
                type='number'
                id='faceCount'
                placeholder='10'
                min='1'
                max='100'
                value={faceCountState.value}
                onChange={faceCountChangeHandler}
                onBlur={faceCountBlurHandler}
                className={`form-control ${faceCountState.wasTouched ? (faceCountState.isValid === false ? 'is-invalid' : 'is-valid') : 'is-valid'}`}
              />
            </div>
          </div>

          <div className='col-2'>
            <button type='submit' className='btn w-100 btn-primary mb-2' disabled={!rollIsValid}>
              Roll
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DiceRollForm;
