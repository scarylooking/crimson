import React, { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";

interface ConnectionStateItemProps {
  connectionState: HubConnectionState;
}

const ConnectionState = ({ connectionState }: ConnectionStateItemProps) => {
  return (
    <>
      {connectionState === HubConnectionState.Connected && <div className="alert alert-success" role="alert">Connected to hub</div>}
      {connectionState === HubConnectionState.Connecting && <div className="alert alert-success" role="alert">Connecting to hub&hellip;</div>}
      {connectionState === HubConnectionState.Disconnecting && <div className="alert alert-danger" role="alert">Disconnecting from hub&hellip;</div>}
      {connectionState === HubConnectionState.Disconnected && <div className="alert alert-danger" role="alert">Disconnected from hub</div>}
      {connectionState === HubConnectionState.Reconnecting && <div className="alert alert-warning" role="alert">Reconnecting to hub&hellip;</div>}
    </>
  );
};

export default ConnectionState;
