import React, { useState, useEffect } from 'react';
import { match } from 'react-router-dom';
import { HubConnectionBuilder, HubConnection, HubConnectionState, LogLevel } from '@microsoft/signalr';
import DiceRollForm from './DiceRollForm';
import DiceRollList from './DiceRollList';
import ConnectionState from './ConnectionState';

interface DiceRollParams {
  sessionId: string;
}

interface DiceRollProps {
  required: string;
  match: match<DiceRollParams>;
}

const DiceRoll = ({ match }: DiceRollProps) => {
  const sessionId = match.params.sessionId;

  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const [connectionState, setConnectionState] = useState<HubConnectionState>(HubConnectionState.Disconnected);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Trace)
      .withUrl('/hubs/dice')
      .withAutomaticReconnect()
      .build();

    const startSuccess = () => {
      setConnectionState(_ => HubConnectionState.Connected);
      joinSession();
    };

    const startFailed = () => {
      setConnectionState(_ => HubConnectionState.Disconnected);
    };

    const joinSession = () => {
      connection.send('joinSession', sessionId);
    };

    connection.onreconnected(function () {
      joinSession();
      setConnectionState(_ => HubConnectionState.Connected);
    });

    connection.onreconnecting(function () {
      setConnectionState(_ => HubConnectionState.Reconnecting);
    });

    connection.onclose(function () {
      setConnectionState(_ => HubConnectionState.Disconnected);
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
      {hubConnection && <DiceRollList connection={hubConnection}></DiceRollList>}
    </>
  );
};

export default DiceRoll;