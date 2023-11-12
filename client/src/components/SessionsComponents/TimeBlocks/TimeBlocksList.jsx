import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../../shared/UIElements/Card";
import TimeBlockItem from "./TimeBlockItem";
import CreateTimeBlockModalForm from "../../Forms/SessionsForms/CreateTimeBlockModalForm";

function TimeBlocksList() {
  const [createTimeBlockFormIsShown, setCreateTimeBlockFormIsShown] =
    useState(false);

  const session = useSelector((state) => state.sessions.detailSession);
  return (
    <>
      {createTimeBlockFormIsShown && (
        <CreateTimeBlockModalForm
          onClose={() => setCreateTimeBlockFormIsShown(false)}
        />
      )}
      <Card className={"flex gap-2"}>
        {session.timeBlocks  && session.timeBlocks.map((timeBlock) => {
          return <TimeBlockItem timeBlock={timeBlock} />;
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
