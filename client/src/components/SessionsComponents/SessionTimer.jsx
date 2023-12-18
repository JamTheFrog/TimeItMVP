import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../shared/UIElements/Card";

function SessionTimer({ timeBlocks }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [seconds, setSeconds] = useState(
    timeBlocks.length > 0 ? timeBlocks[0].duration : 0
  );
  const [isRunning, setIsRunning] = useState(true);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  useEffect(() => {
    if (
      activeIndex >= timeBlocks.length ||
      timeBlocks.length === 0 ||
      !isRunning
    )
      return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      setActiveIndex((prevIndex) => {
        // Check if there is a next time block before accessing its properties
        if (prevIndex + 1 < timeBlocks.length) {
          setSeconds(timeBlocks[prevIndex + 1].duration);
          return prevIndex + 1;
        } else {
          // No more time blocks, reset seconds and clear interval
          setSeconds(0);
          setIsRunning(false);
          clearInterval(intervalId);
          return prevIndex;
        }
      });
    }

    return () => clearInterval(intervalId);
  }, [activeIndex, seconds, timeBlocks, isRunning]);

  if (timeBlocks.length === 0) {
    return <div>No time blocks available.</div>;
  }

  const currentBlock = timeBlocks[activeIndex];

  return (
    <Card>
      <h1 className="font-primaryFont text-center text-xl uppercase">
        Your session just begun
      </h1>
      {timeBlocks.map((block, index) => (
        <div
          key={block.id}
          className={`p-4 rounded-lg shadow-md sm:p-8  ${index === activeIndex ? "bg-emerald-500" : "bg-white"} mb-4`}
        >
          <p
            className={`${
              index === activeIndex ? "text-white" : "text-primary"
            } font-semibold text-lg`}
          >
            Title: {block.title}
          </p>
          <p
            className={`${
              index === activeIndex ? "text-primaryLight" : "text-gray-500"
            } mb-4`}
          >
            Duration: {formatTime(block.duration)}
          </p>
          <p
            className={`${
              index === activeIndex ? "text-white" : "text-primary"
            } font-semibold text-lg`}
          >
            Description: {block.description}
          </p>
        </div>
      ))}
      <div className="flex flex-col items-center">
        <p className="text-primary text-2xl  uppercase font-primaryFont font-semibold mb-4 mt-16">
          Duration: {formatTime(seconds)}
        </p>
        {isRunning ? (
          <button
            className="text-white mb-4  flex items-center gap-2 bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            onClick={handleStop}
          >
            Stop Timer
          </button>
        ) : (
          <button
            className="text-white  mb-4 flex items-center gap-2 bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            onClick={handleStart}
          >
            Start Timer
          </button>
        )}
        <h2 className="text-lg">Current Block</h2>
        <p className="text-lg text-center text-gray-600">
          Title: {currentBlock.title}
        </p>
      </div>
    </Card>
  );
}

export default SessionTimer;
