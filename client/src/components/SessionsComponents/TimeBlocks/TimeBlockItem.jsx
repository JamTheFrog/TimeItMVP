import React from "react";

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${hours}h ${minutes}m ${remainingSeconds}s`;

  return formattedTime;
}

function TimeBlockItem({ timeBlock }) {
  return (
    <div className="bg-primary rounded-lg shadow-lg p-2">
      <h1 className="text-white font-semibold font-primaryFont">{timeBlock.title}</h1>
      <p className="text-primaryLight text-sm">{formatTime(timeBlock.duration)}</p>
    </div>
  );
}

export default TimeBlockItem;
