import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../shared/UIElements/Card";
import TimeBlockItem from "./TimeBlockItem";
import CreateTimeBlockModalForm from "../../Forms/SessionsForms/CreateTimeBlockModalForm";
import EditTimeBlockModalForm from "../../Forms/SessionsForms/EditTimeBlockModalForm";
import { deleteSession } from "../../../store/actions/sessions-actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TimeBlocksList() {
  const [createTimeBlockFormIsShown, setCreateTimeBlockFormIsShown] =
    useState(false);
  const [editTimeBlockFormIsShown, setEditTimeBlockFormIsShown] =
    useState(false);
  const [timeBlock, setTimeBlock] = useState(false);

  const session = useSelector((state) => state.sessions.detailSession);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const history = useHistory()

  const setTimeBlockData = (timeBlock) => {
    setEditTimeBlockFormIsShown(true);
    setTimeBlock(timeBlock);
  };

  const editSessionHandler = () => {};

  const deleteSessionHandler = () => {
    dispatch(deleteSession(session.id, token, () => {
      console.log("called back");
      history.push("/sessions")
    }));
    
  };
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
          timeBlock={timeBlock}
        />
      )}
      <Card className={"flex flex-col gap-2"}>
        {session.timeBlocks &&
          session.timeBlocks.map((timeBlock) => {
            return (
              <TimeBlockItem
                key={timeBlock}
                timeBlock={timeBlock}
                setTimeBlockData={(timeblock) => {
                  setTimeBlockData(timeblock);
                }}
              />
            );
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
      <div className="flex justify-between mt-4 px-[15%]">
        <button
          className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => editSessionHandler()} 
        >
          Edit session
        </button>
        <button
          className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => deleteSessionHandler()}
        >
          Delete session
        </button>
      </div>
    </>
  );
}

export default TimeBlocksList;
