import React, { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface State<T> {
  value: T;
  isValid: boolean;
  wasTouched?: boolean;
}

type Action<T> = { type: 'USER_INPUT'; value: T } | { type: 'INPUT_BLUR' };

const stringValueReducer = (state: State<string>, action: Action<string>): State<string> => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length >= 7, wasTouched: true };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 7, wasTouched: true };
  }

  return { value: '', isValid: false, wasTouched: true };
};

const DiceRollSessionBuilder: React.FunctionComponent = () => {
  const history = useHistory();

  const sessionIdChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchSessionId({ type: 'USER_INPUT', value: event.target.value });
  };

  const sessionIdBlurHandler = () => {
    dispatchSessionId({ type: 'INPUT_BLUR' });
  };

  const joinSessionHandler = () => {
    history.push(`/dice/${sessionIdState.value}`);
  };

  const generateNewSessionId = (): string => {
    let sessionId: string;

    do {
      sessionId = Math.random().toString(36).substring(2, 15);
    } while (sessionId.length < 10);

    return sessionId;
  };

  const [formIsValid, setFormIsValid] = useState(true);
  const [sessionIdState, dispatchSessionId] = useReducer(stringValueReducer, { value: generateNewSessionId(), isValid: true, wasTouched: false });
  const { isValid: sessionIdIsValid } = sessionIdState;

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setFormIsValid(sessionIdIsValid);
    }, 100);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [sessionIdIsValid]);

  return (
    <>
      <form noValidate className="needs-validation">
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="session">Session Id</label>
            <input
              type="text"
              id="session"
              value={sessionIdState.value}
              onChange={sessionIdChangeHandler}
              onBlur={sessionIdBlurHandler}
              className={`form-control ${sessionIdState.wasTouched ? (sessionIdState.isValid === false ? 'is-invalid' : 'is-valid') : 'is-valid'}`}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-4">
            <button className="btn btn-primary" disabled={!formIsValid} onClick={joinSessionHandler}>
              Join Session
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DiceRollSessionBuilder;
