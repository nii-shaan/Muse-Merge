import React from "react";
import PostForm from "../components/post-form/PostForm";

function AddPost() {
  return (
    <div className="bg-[#151515]  min-h-[800px]">
      <div
        id="container"
        className=" flex w-full h-full  justify-center items-center my-10"
      >
        <PostForm />
      </div>
    </div>
  );
}

export default AddPost;
