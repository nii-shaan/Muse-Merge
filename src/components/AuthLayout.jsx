import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../pages/index";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state) => state.authReducer.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <Loader /> : <>{children}</>;
}

export default Protected;
