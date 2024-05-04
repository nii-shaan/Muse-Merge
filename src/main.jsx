import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { Addpost, AllPost, Home, Login, Signup } from "./pages/index.js";
import { RouterProvider } from "react-router-dom";
import Protected from "./components/AuthLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route
        path="/addpost"
        element={
          <Protected>
            {" "}
            <Addpost />
          </Protected>
        }
      />
      <Route
        path="/allposts"
        element={
          <Protected>
            {" "}
            <AllPost />
          </Protected>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);
