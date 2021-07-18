import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { HubConnectionState, HubConnection } from '@microsoft/signalr';

interface Props {
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

const dieCountValueReducer = (state: State<number>, action: Action<number>): State<number> => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value >= 1 && action.value <= 100,
      wasTouched: true,
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value >= 1 && state.value <= 100,
      wasTouched: true,
    };
  }

  return {
    value: 1,
    isValid: false,
    wasTouched: true,
  };
};

const faceCountValueReducer = (state: State<number>, action: Action<number>): State<number> => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value >= 1 && action.value <= 100,
      wasTouched: true,
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value >= 1 && state.value <= 100,
      wasTouched: true,
    };
  }

  return { value: 10, isValid: false, wasTouched: true };
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

const DiceRollForm: React.FunctionComponent<Props> = ({ connection, sessionId, connectionState }: Props) => {
  const [rollIsValid, setRollIsValid] = useState(false);

  const [dieCountState, dispatchDieCount] = useReducer(dieCountValueReducer, { value: 1, isValid: true, wasTouched: false });
  const [faceCountState, dispatchFaceCount] = useReducer(faceCountValueReducer, { value: 10, isValid: true, wasTouched: false });
  const [nameState, dispatchName] = useReducer(stringValueReducer, { value: '', isValid: false, wasTouched: false });
  const [dieType, setDieType] = useState('standard');

  const { isValid: dieCountIsValid } = dieCountState;
  const { isValid: faceCountIsValid } = faceCountState;
  const { isValid: nameIsValid } = nameState;

  const dieCountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchDieCount({ type: 'USER_INPUT', value: +event.target.value });
  };

  const dieCountBlurHandler = () => {
    dispatchDieCount({ type: 'INPUT_BLUR' });
  };

  const faceCountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = dieType === 'percentile' ? 1 : +event.target.value;
    dispatchFaceCount({ type: 'USER_INPUT', value: fieldValue });
  };

  const faceCountBlurHandler = () => {
    dispatchFaceCount({ type: 'INPUT_BLUR' });
  };

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchName({ type: 'USER_INPUT', value: event.target.value });
  };

  const nameBlurHandler = () => {
    dispatchName({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const faceCount = dieType === 'standard' ? String(faceCountState.value) : '%'

    if (connection.state === HubConnectionState.Connected) {
      connection.send('roll', sessionId, nameState.value, dieCountState.value, faceCount);
    }
  };

  const dieTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDieType(event.currentTarget.value)
  }

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
      <Form onSubmit={submitHandler} noValidate className='needs-validation'>
        <Row className='mb-2'>
          <Form.Group as={Col} md='4'>
            <Form.Label htmlFor='name' visuallyHidden>Name</Form.Label>
            <Form.Control
              id='name'
              type='text'
              value={nameState.value}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              className={`form-control ${nameState.wasTouched ? (nameState.isValid === false ? 'is-invalid' : 'is-valid') : 'is-invalid'}`}
              placeholder='Al Paca'
            />
            <Form.Control.Feedback type='invalid'>Name is required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md='3'>
            <Form.Label htmlFor='dieCount' visuallyHidden>Number of Die</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                id='dieCount'
                type='number'
                placeholder='10'
                min='1'
                max='100'
                value={dieCountState.value}
                onChange={dieCountChangeHandler}
                onBlur={dieCountBlurHandler}
                className={`form-control ${dieCountState.wasTouched ? (dieCountState.isValid === false ? 'is-invalid' : 'is-valid') : 'is-valid'}`}
              />
              <InputGroup.Text>x</InputGroup.Text>
              <Form.Control.Feedback type='invalid'>Must be between 1-100</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md='3'>
            <Form.Label htmlFor='faceCount' visuallyHidden>Number of Faces</Form.Label>
            <InputGroup hasValidation>
              <ButtonGroup>
                <ToggleButton
                  key='standard'
                  id='rolltype-standard'
                  type='radio'
                  variant='outline-primary'
                  name='radio'
                  value='standard'
                  checked={dieType === 'standard'}
                  onChange={dieTypeChangeHandler}
                >
                  d
                </ToggleButton>
                <ToggleButton
                  key='percentile'
                  id='rolltype-percentile'
                  type='radio'
                  variant='outline-primary'
                  name='radio'
                  value='percentile'
                  checked={dieType === 'percentile'}
                  onChange={dieTypeChangeHandler}
                >
                  %
                </ToggleButton>
              </ButtonGroup>
              <Form.Control
                id='faceCount'
                type='number'
                placeholder='10'
                min='1'
                max='100'
                value={faceCountState.value}
                onChange={faceCountChangeHandler}
                onBlur={faceCountBlurHandler}
                disabled={dieType === 'percentile'}
                className={`form-control ${faceCountState.wasTouched ? (faceCountState.isValid === false ? 'is-invalid' : 'is-valid') : 'is-valid'}`}
              />
              <Form.Control.Feedback type='invalid'>Must be between 1-100</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md='2' controlId='rollButton'>
            <InputGroup >
              <Button className='w-100' disabled={!rollIsValid} type='submit'>Roll</Button>
            </InputGroup>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};

export default DiceRollForm;
