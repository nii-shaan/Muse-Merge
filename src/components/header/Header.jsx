import React from "react";
import { Link,NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";

function Header() {
  const activeStatus = useSelector((state)=>state.authReducer.status)
  console.log(activeStatus);

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

  return (
    <header className="bg-[#3D3C42] h-[120px] w-full text-center text-white flex justify-center flex-wrap items-center ">
      <div id="leftSide" className="h-full w-[50%] "></div>

      <div id="rightSide" className=" h-full w-[50%] border-white border-l">
        <ul className="w-full h-full flex items-center justify-evenly">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.id}>
                <NavLink to={item.path} className={({isActive})=>(isActive?"text-red-500":"")} >
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
    </header>
  );
}

export default Header;
