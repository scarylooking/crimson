import React, { useState, useEffect } from 'react';
import { match } from 'react-router-dom';
import {
  HubConnectionBuilder, HubConnection, HubConnectionState, LogLevel,
} from '@microsoft/signalr';
import DiceRollForm from './DiceRollForm';
import DiceRollList from './DiceRollList';
import ConnectionState from './ConnectionState';

interface DiceRollParams {
  sessionId: string;
}

interface Props {
  required: string;
  match: match<DiceRollParams>;
}

const DiceRoll: React.FunctionComponent<Props> = ({ match }: Props) => {
  const { sessionId } = match.params;

  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const [connectionState, setConnectionState] = useState<HubConnectionState>(HubConnectionState.Disconnected);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Trace)
      .withUrl('/hubs/dice')
      .withAutomaticReconnect()
      .build();

    const startSuccess = () => {
      setConnectionState(() => HubConnectionState.Connected);
      joinSession();
    };

    const startFailed = () => {
      setConnectionState(() => HubConnectionState.Disconnected);
    };

    const joinSession = () => {
      connection.send('joinSession', sessionId);
    };

    connection.onreconnected(() => {
      joinSession();
      setConnectionState(() => HubConnectionState.Connected);
    });

    connection.onreconnecting(() => {
      setConnectionState(() => HubConnectionState.Reconnecting);
    });

    connection.onclose(() => {
      setConnectionState(() => HubConnectionState.Disconnected);
    });

    connection.start().then(startSuccess, startFailed);

    setHubConnection(connection);

    return function cleanup() {
      connection.stop();
    };
  }, [sessionId]);

  return (
    <>
      <ConnectionState connectionState={connectionState} />
      {hubConnection && <DiceRollForm connection={hubConnection} sessionId={sessionId} connectionState={connectionState} />}
      {hubConnection && <DiceRollList connection={hubConnection} />}
    </>
  );
};

export default DiceRoll;
