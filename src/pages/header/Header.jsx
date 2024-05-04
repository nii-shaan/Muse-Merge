import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import { Tooltip } from "antd";
import { Logout } from "../index";

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
    hidden: { y: -70 },
    visible: { y: 0 },
  };

  return (
    <motion.header
      className="bg-[#3D3C42]  w-full text-center text-white flex flex-col mb-[50px]"
      initial={displayNav ? "visible" : "hidden"}
      animate={displayNav ? "visible" : "hidden"}
      variants={navVariants}
      transition={{ delay: 0.05 }}
    >
      <div className="w-full h-[50px] flex mt-[20px] ">
        <div id="r" className="h-full w-full flex justify-center ">
          <ul className="w-full h-full flex items-center justify-evenly max-w-lg sm:text-xs">
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
          <Tooltip placement="bottom" title="Hide Navigation Bar" color="gray">
            <button>
              <SlArrowUp
                className="text-[35px] cursor-pointer hover:text-[#a3a3a3]"
                onClick={handleDisplayNav}
              />
            </button>
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title="Show Navigation Bar" color="gray">
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
