import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authService } from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout } from "./store/slices/Auth";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
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
        <Outlet />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div className="bg-[#151515] h-screen w-full flex flex-col justify-center items-center">
          <div class="animate-pulse flex flex-col items-center gap-4 w-full h-full justify-center">
            <div class="w-full h-[20%] bg-slate-400 rounded-md"></div>
            <div class="w-[80%] h-[10%] bg-slate-400 mx-auto mt-3 rounded-md"></div>
            <div class="h-[5%] bg-slate-400 w-[70%] rounded-md"></div>
            <div class="h-[50%] bg-slate-400 w-[60%] rounded-md"></div>
            <div class="h-[15%] bg-slate-400 w-[95%] rounded-md"></div>
            <div class="h-[20%] bg-slate-400 w-full rounded-md"></div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
