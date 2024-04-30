import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import { motion } from "framer-motion";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

function Header() {
  const activeStatus = useSelector((state) => state.authReducer.status);
  console.log(activeStatus);

  const [displayNav, setDisplayNav] = useState(true);

  const handleDisplayNav = () => {
    setDisplayNav((prev) => !prev);
  };

  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/",
      active: true,
    },
    {
      id: 2,
      name: "Login",
      path: "/login",
      active: !activeStatus,
    },
    {
      id: 3,
      name: "Signup",
      path: "/signup",
      active: !activeStatus,
    },
    {
      id: 4,
      name: "All Posts",
      path: "/allposts",
      active: activeStatus,
    },
    {
      id: 5,
      name: "Add Post",
      path: "/addpost",
      active: activeStatus,
    },
  ];

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0 },
  };

  return (
    <motion.header
      className="bg-[#3D3C42]  w-full text-center text-white flex flex-col"
      initial={displayNav ? "visible" : "hidden"}
      animate={displayNav ? "visible" : "hidden"}
      variants={navVariants}
      transition={{ delay: 0.05 }}
    >
      <div className="w-full h-[80px] flex mt-[20px]">
        <div id="leftSide" className="h-full w-[50%] "></div>

        <div id="rightSide" className=" h-full w-[50%] border-[#151515] border-l-[2px]">
          <ul className="w-full h-full flex items-center justify-evenly">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "text-[#ff008c] text-[18px]" : ""
                    }
                  >
                    <button className="px-[20px] py-[10px] rounded-lg hover:bg-[#151515]">
                      {item.name}
                    </button>
                  </NavLink>
                </li>
              ) : null
            )}
            {activeStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="w-full  flex items-center justify-center ">
        {displayNav ? (
          <Tooltip
            title="Hide Navigation Bar"
            placement="bottom"
            className="relative z-20"
            arrow
            slotProps={{
              popper: {
                sx: {
                  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                    {
                      marginTop: "30px",
                    },
                },
              },
            }}
          >
            <button>
              <SlArrowUp
                className="text-[35px] cursor-pointer hover:text-[#a3a3a3]"
                onClick={handleDisplayNav}

              />
            </button>
          </Tooltip>
        ) : (
          <Tooltip
            title="Show Navigation Bar"
            placement="bottom"
            className="relative z-20"
            arrow
            slotProps={{
              popper: {
                sx: {
                  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                    {
                      marginTop: "30px",
                    },
                },
              },
            }}
          >
            <button>
              <SlArrowDown
                className="text-[35px] cursor-pointer hover:text-[#a3a3a3]"
                onClick={handleDisplayNav}
              />
            </button>
          </Tooltip>
        )}
      </div>
    </motion.header>
  );
}

export default Header;
