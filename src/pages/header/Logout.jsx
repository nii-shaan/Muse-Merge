import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/Auth";
import { authService } from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <button
      onClick={handleLogout}
      className="px-[20px] py-[10px] rounded-lg hover:bg-[#151515]"
    >
      Logout
    </button>
  );
}

export default Logout;
