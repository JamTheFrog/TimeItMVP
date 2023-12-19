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
  const [showEditForm, setShowEditForm] = useState(false)

  const editTimeblockHandler = () => {
    setShowEditForm(true)
    setTimeBlockData(timeBlock)
  }
  return (
    <div className="bg-primary rounded-lg shadow-lg p-2" style={{ display: 'flex', flexDirection: 'column' }}>
    <h1 className="text-white font-semibold font-primaryFont">{timeBlock.title}</h1>
    <p className="text-primaryLight text-sm">{formatTime(timeBlock.duration)}</p>
    <p className="text-primaryLight text-sm">{timeBlock.description}</p>
    <button onClick={() => {editTimeblockHandler()}} className="mt-auto hover:px-2 text-primary bg-white px-4 border-[1px] hover:border-white hover:bg-primary hover:text-white hover:rounded-3xl hover:py-2 hover:font-bold transform transition-all duration-150 border-black">Edit timeblock</button>

  </div>
  );
}

export default TimeBlockItem;
