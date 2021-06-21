import React, { FC, useState } from "react";
import { DiceRollResponse } from "../Interfaces/DiceRollResponse";
import styles from "./DiceRollItem.module.css";

interface ConnectionStateItemProps {
  connectionState: string;
}

const ConnectionState = ({ connectionState }: ConnectionStateItemProps) => {
  const getAlertType = ():string => {
    switch (connectionState) {
      case "connected":
        return "alert-success";
        case "failed":
          return "alert-danger";
      case "disconnected":
        return "alert-danger";
      case "connecting":
        return "alert-info";
      case "reconnecting":
        return "alert-warning";
    }

    return "alert-primary";
  };

  const getMessage = ():string => {
    switch (connectionState) {
      case "connected":
        return "Connected to hub";
        case "disconnected":
          return "Connection to hub failed";
      case "disconnected":
        return "Disconnected from hub";
      case "connecting":
        return "Connecting to hub...";
      case "reconnecting":
        return "Reconnecting to hub...";
    }

    return "";
  };

  return (
    <>
      <div className={`alert ${getAlertType()}`} role="alert">
        {getMessage()}
      </div>
    </>
  );
};

export default ConnectionState;
