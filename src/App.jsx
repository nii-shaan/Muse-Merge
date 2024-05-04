import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "./appwrite/auth";
import { login, logout } from "./store/slices/Auth";
import { Header, Footer, Loader } from "./pages/index";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  console.log("test");

  if (!loading) {
    return (
      <>
        <Header />
        <ToastContainer />
        <Outlet />
        <Footer />
      </>
    );
  } else {
    return <Loader />;
  }
}

export default App;
