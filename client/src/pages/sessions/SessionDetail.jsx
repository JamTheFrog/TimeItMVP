import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getDetailSession } from "../../store/actions/sessions-actions";
import SessionTimer from "../../components/SessionsComponents/SessionTimer";

function SessionDetail() {
  const [timerIsActive, setTimerIsActive] = useState(false);
  const { sessionid } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const session = useSelector((state) => state.sessions.detailSession);
  console.log(session);
  useEffect(() => {
    dispatch(getDetailSession(sessionid, token));
  }, [token]);

  return (
    <div className="p-4">
      {session && !timerIsActive && (
        <div className="m-auto flex flex-col items-center gap-6">
          <h1 className="font-primaryFont text-center  uppercase text-darkHard lg:text-[180px] md:text-[120px] sm:text-[80px] text-[40px] lg:leading-[180px] md:leading-[120px] sm:leading-[90px] leading-[64.4px] mb-2 mt-4">
            {session.name}
          </h1>
          <h1 className="font-primaryFont text-center text-2xl text-gray-600 ">
            {session.description}
          </h1>
          <button
            className="text-white animate-bumpInfinite mb-4 flex items-center gap-2 bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            onClick={() => setTimerIsActive(true)}
          >
            Start Session
          </button>
        </div>
      )}
      {timerIsActive && session.timeBlocks && session.timeBlocks.length > 0 && (
        <SessionTimer timeBlocks={session.timeBlocks} />
      )}
    </div>
  );
}

export default SessionDetail;
