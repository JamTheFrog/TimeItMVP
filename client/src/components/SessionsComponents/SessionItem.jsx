import React from "react";
import Card from "../../shared/UIElements/Card";

function SessionItem({ session }) {
  return (
    <Card>
      <h1 className="text-primary font-semibold font-primaryFont text-xl mb-2">
        {session.name}
      </h1>
      <p className="text-gray-600">{session.description}</p>
      <button
        type="submit"
        className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 text-center "
      >
        Start session
      </button>
    </Card>
  );
}

export default SessionItem;
