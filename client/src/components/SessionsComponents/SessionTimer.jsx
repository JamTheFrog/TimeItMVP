import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../shared/UIElements/Card";

function SessionTimer({ timeBlocks }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [seconds, setSeconds] = useState(
    timeBlocks.length > 0 ? timeBlocks[0].duration : 0
  );

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  useEffect(() => {
    // Exit the effect if all time blocks are completed or no time blocks are provided
    if (activeIndex >= timeBlocks.length || timeBlocks.length === 0) return;

    // Update the countdown every second
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Move to the next time block when the current one reaches 0
    if (seconds === 0) {
      setActiveIndex((prevIndex) => {
        // Check if there is a next time block before accessing its properties
        if (prevIndex + 1 < timeBlocks.length) {
          setSeconds(timeBlocks[prevIndex + 1].duration);
          return prevIndex + 1;
        } else {
          // No more time blocks, reset seconds and clear interval
          setSeconds(0);
          clearInterval(intervalId);
          return prevIndex;
        }
      });
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [activeIndex, seconds, timeBlocks]);

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
        <Card
          key={block.id}
          className={`${index === activeIndex ? "bg-primary " : "white"} mb-4`}
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
        </Card>
      ))}
      <div>
        <p className="text-primary text-2xl text-center uppercase font-primaryFont font-semibold mb-4 mt-16">
          Duration: {formatTime(seconds)}
        </p>
        <h2 className=" text-center  ">
          Current Block
        </h2>
        <p className=" text-center text-gray-600">
          Title: {currentBlock.title}
        </p>
      </div>
    </Card>
  );
}

export default SessionTimer;
