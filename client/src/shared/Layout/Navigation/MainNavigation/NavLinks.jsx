import { NavLink } from "react-router-dom";

const NavLinks = ({ closeNavLinks }) => {
  const links = [
    { label: "Početna", href: "/" },
    { label: "Kreiraj profil", href: "/auth/signup" },
    { label: "Prijavi se", href: "/auth/signin" },
    { label: "Odjavi se", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <NavLink to={href} key={href}>
          <li className="w-full sm:w-max cursor-pointer rounded-sm p-2 text-center  hover:text-primary px-4">
            {label}
          </li>
        </NavLink>
      );
    });

  return (
    <ul
      onClick={() => closeNavLinks(false)}
      className={`gap-6 z-30 bg-white text-gray-600 text-sm mt-4 sm:mt-0 flex flex-col items-center justify-between sm:flex-row`}
    >
      {links}
    </ul>
  );
};

export default NavLinks;
