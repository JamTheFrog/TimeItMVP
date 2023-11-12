import React from "react";
import { useSelector } from "react-redux";
import SessionItem from "./SessionItem";

function SessionsList() {
  const sessions = useSelector((state) => state.sessions.sessionsList);
  return (
    <div className="grid grid-cols-4 gap-2">
      {sessions.map((session) => {
        return <SessionItem session={session} />;
      })}
    </div>
  );
}

export default SessionsList;
