import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSessions } from "../../store/actions/sessions-actions";
import SessionsList from "../../components/SessionsComponents/SessionsList";

function Sessions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessions());
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-primaryFont text-center  uppercase text-darkHard lg:text-[180px] md:text-[120px] sm:text-[80px] text-[40px] lg:leading-[180px] md:leading-[120px] sm:leading-[90px] leading-[64.4px] mb-2 mt-4">
        START YOUR <span className="text-primary">SESSIONS</span> YOURNEY
      </h1>
      <SessionsList />
    </div>
  );
}

export default Sessions;
