import React from "react";
import Card from "../../shared/UIElements/Card";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {RxArrowRight} from 'react-icons/rx'

function SessionItem({ session }) {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <Card className={"flex flex-col items-center justify-between"}>
      <h1 className="text-primary font-semibold font-primaryFont text-xl mb-2">
        {session.name}
      </h1>
      <p className="text-gray-600">{session.description}</p>
      <Link
        className="text-white mt-4  bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm px-5 py-2.5  "
        to={currentUser ? `/sessions/${session.id}` : "/auth/signin"}
      >
        <span className="font-semibold ">Start session</span>
      </Link>
      {location.pathname.includes("ownersessions") && (
        <Link
          className="text-darkHard mt-4 flex items-center gap-2 focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm px-5 py-2.5  "
          to={`/sessions/${session.id}/editsession`}
        >
          <span className="font-semibold ">Edit session</span> <RxArrowRight className="mt-0.5 text-lg"/>
        </Link>
      )}
    </Card>
  );
}

export default SessionItem;
