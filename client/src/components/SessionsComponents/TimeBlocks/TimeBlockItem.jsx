import React, { useState } from "react";

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

function TimeBlockItem({ timeBlock, setTimeBlockData }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const editTimeblockHandler = () => {
    setShowEditForm(true);
    setTimeBlockData(timeBlock);
  };
  return (
    <div
      className="bg-primary rounded-lg shadow-lg p-2"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className="text-white font-semibold font-primaryFont">
        {timeBlock.title}
      </h1>
      <p className="text-primaryLight text-sm">
        {formatTime(timeBlock.duration)}
      </p>
      <p className="text-primaryLight text-sm">{timeBlock.description}</p>
      <button
        onClick={() => {
          editTimeblockHandler();
        }}
        className="mt-auto text-primary px-[6px] border-[1px] border-white bg-white  hover:bg-primary hover:text-white rounded-3xl hover:rounded-none transform transition-all duration-300 shadow-lg"
        style={{ color: "transparent" }}
      >
        O
      </button>
    </div>
  );
}

export default TimeBlockItem;
