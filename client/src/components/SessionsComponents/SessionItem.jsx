import React from "react";
import Card from "../../shared/UIElements/Card";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function SessionItem({ session }) {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <Card>
      <h1 className="text-primary font-semibold font-primaryFont text-xl mb-2">
        {session.name}
      </h1>
      <p className="text-gray-600">{session.description}</p>
      {/* <button
        type="submit"
        className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 text-center "
      >
        Start session
      </button> */}
      <Link
        to={
          currentUser
            ? `/sessions/${session.id}`
            : "/auth/signin"
        }
      >
        <span className="font-semibold text-primary">Start session</span>
      </Link>
      {location.pathname.includes("ownersessions") && (
        <Link to={`/sessions/${session.id}/createtimeblock`}>
          <span className="font-semibold text-primary">Create time blocks</span>
        </Link>
      )}
    </Card>
  );
}

export default SessionItem;
