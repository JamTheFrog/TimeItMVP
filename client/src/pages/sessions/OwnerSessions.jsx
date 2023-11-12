import React, { useEffect } from "react";
import SessionsList from "../../components/SessionsComponents/SessionsList";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerSessions } from "../../store/actions/sessions-actions";

function OwnerSessions() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getOwnerSessions(token));
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="font-primaryFont text-center  uppercase text-darkHard lg:text-[180px] md:text-[120px] sm:text-[80px] text-[40px] lg:leading-[180px] md:leading-[120px] sm:leading-[90px] leading-[64.4px] mb-2 mt-4">
        YOUR <span className="text-primary">SESSIONS</span>
      </h1>

      <SessionsList />
    </div>
  );
}

export default OwnerSessions;
