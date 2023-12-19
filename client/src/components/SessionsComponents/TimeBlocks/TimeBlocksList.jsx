import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../../shared/UIElements/Card";
import TimeBlockItem from "./TimeBlockItem";
import CreateTimeBlockModalForm from "../../Forms/SessionsForms/CreateTimeBlockModalForm";
import EditTimeBlockModalForm from "../../Forms/SessionsForms/EditTimeBlockModalForm";

function TimeBlocksList() {
  const [ createTimeBlockFormIsShown, setCreateTimeBlockFormIsShown] = useState(false);
  const [ editTimeBlockFormIsShown, setEditTimeBlockFormIsShown] = useState(false);
  const [ timeBlock, setTimeBlock] = useState(false)

  const session = useSelector((state) => state.sessions.detailSession);
  
  const setTimeBlockData = (timeBlock) => {
    setEditTimeBlockFormIsShown(true)
    setTimeBlock(timeBlock)
    console.log("success");
  }
  return (
    <>
      {createTimeBlockFormIsShown && (
        <CreateTimeBlockModalForm
          onClose={() => setCreateTimeBlockFormIsShown(false)}
        />
      )}
      {editTimeBlockFormIsShown && timeBlock && (
        <EditTimeBlockModalForm 
          onClose={() => setEditTimeBlockFormIsShown(false)}
          timeBlock = {timeBlock}
        />
      )}
      <Card className={"flex gap-2"}>
        {session.timeBlocks  && session.timeBlocks.map((timeBlock) => {
          return <TimeBlockItem key={timeBlock} timeBlock={timeBlock} setTimeBlockData={(timeblock) => {setTimeBlockData(timeblock)}}/>;
        })} 
        <div
          className=" p-4 bg-white rounded-lg shadow-md sm:p-8  cursor-pointer hover:scale-105 transition"
          onClick={() => setCreateTimeBlockFormIsShown(true)}
        >
          <h1 className="font-primaryFont text-primary uppercase font-semibold">
            Add Time Block
          </h1>
          <h1 className="text-7xl text-center text-gray-300">+</h1>
        </div>
      </Card>
    </>
  );
}

export default TimeBlocksList;
