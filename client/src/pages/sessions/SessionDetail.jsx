import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getDetailSession } from "../../store/actions/sessions-actions";
import SessionTimer from "../../components/SessionsComponents/SessionTimer";

function SessionDetail() {
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
      {session.timeBlocks && session.timeBlocks.length > 0 && <SessionTimer timeBlocks={session.timeBlocks} />}
    </div>
  );
}

export default SessionDetail;
