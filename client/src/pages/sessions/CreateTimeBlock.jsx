import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getDetailSession } from "../../store/actions/sessions-actions";
import TimeBlocksList from "../../components/SessionsComponents/TimeBlocks/TimeBlocksList";

function CreateTimeBlock() {
  const { sessionid } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getDetailSession(sessionid, token));
  }, [token]);

  return (
    <div className="p-4">
      <TimeBlocksList />
    </div>
  );
}

export default CreateTimeBlock;
