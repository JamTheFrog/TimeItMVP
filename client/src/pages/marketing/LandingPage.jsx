import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function LandingPage() {
  return (
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="animate-bounce font-primaryFont text-center  uppercase text-darkHard lg:text-[180px] md:text-[120px] sm:text-[80px] text-[40px] lg:leading-[180px] md:leading-[120px] sm:leading-[90px] leading-[64.4px] mb-2 mt-4">
        <span className="text-primary">TIME</span>IT YOURSELF
      </h1>
      <div className="text-center animate-bumpInfinite">
        <Link
          to={"/sessions"}
          className={
            "bg-primary  hover:bg-primaryDark transition text-2xl px-8 py-4 rounded-lg font-semibold font-primaryFont text-white shadow-lg"
          }
        >
          START YOUR SESSION
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
