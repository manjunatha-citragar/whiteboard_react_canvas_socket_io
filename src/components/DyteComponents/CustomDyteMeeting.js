import React from "react";
import { useDyteMeeting, useDyteSelector } from "@dytesdk/react-web-core";
import Setup from "./Setup/Setup";
import Meeting from "./Meeting/Meeting";

export const CustomDyteMeeting = () => {
  const { meeting } = useDyteMeeting();

  const roomJoined = useDyteSelector((m) => m?.self?.roomJoined);

  if (!meeting) return;

  return <>{!roomJoined ? <Setup /> : <Meeting />}</>;
};
