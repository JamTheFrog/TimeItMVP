import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { GrClose } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";

const MainNavigation = () => {
  const [navLinksAreVisible, setNavLinksAreVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    if (window) {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      if (screenWidth > 640) setNavLinksAreVisible(true);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [screenWidth]);

  const closeNavLinks = (value) => setNavLinksAreVisible(value);

  return (
    <nav className="fixed top-0 z-30 w-full p-4 bg-white shadow-sm  sm:h-16 sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center font-primaryFont justify-between">
        <NavLink to="/" className="flex ">
          <span
            className="self-center
           font-semibold whitespace-nowrap text-darkHard"
          >
            <span className="text-primary">Time</span>IT
          </span>
        </NavLink>
        <h4
          className="sm:hidden"
          onClick={() => setNavLinksAreVisible(!navLinksAreVisible)}
        >
          {navLinksAreVisible ? <GrClose /> : <RxHamburgerMenu />}
        </h4>
      </div>
      {navLinksAreVisible && (
        <NavLinks
          closeNavLinks={screenWidth < 640 ? closeNavLinks : () => {}}
        />
      )}
    </nav>
  );
};

export default MainNavigation;
