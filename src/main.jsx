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
import {
  Addpost,
  YourPosts,
  Home,
  Login,
  Signup,
  EditPost,
  Post,
} from "./pages/index.js";
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
        path="/yourposts"
        element={
          <Protected>
            {" "}
            <YourPosts />
          </Protected>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <Protected>
            <EditPost />
          </Protected>
        }
      />
      <Route
        path="/post/:slug"
        element={
          <Protected>
            <Post />
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
