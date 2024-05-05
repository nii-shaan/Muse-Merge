import React, { useEffect, useState } from "react";
import service from "../appwrite/config";

import { authService } from "../appwrite/auth";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

function YourPosts() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  // console.log(posts);  PASSED

  const [currentUser, setCurrentUser] = useState("");
  // console.log(currentUser);  PASSED

  useEffect(() => {
    authService.getCurrentUser().then((data) => setCurrentUser(data.$id));

    service.getPosts().then((data) => {
      const filteredPosts = data.documents.filter(
        (item) => item.user_id === currentUser
      );

      if (currentUser) {
        if (filteredPosts) {
          setPosts(filteredPosts);
        }
      }
    });
  }, [currentUser]);
  // console.log(data.documents.user_id)

  if (posts.length > 0) {
    return (
      <div className="bg-[#151515]  w-full flex flex-col items-center justify-start min-h-[900px] ">
        {posts.map((data) => (
          <div
            key={data.$id}
            className="bg-[#453F78] w-[90%] max-w-[1000px] h-[250px] rounded-xl flex items-center px-4  mb-8"
          >
            {console.log(data)}
            {console.log(service.getFilePreview(data.featured_image))}

            <div className=" w-[30%] h-[75%]  mr-4 rounded-xl flex items-center">
              <div
                id="featuredImage"
                className="w-full h-full bg-contain bg-no-repeat  rounded-xl "
                style={{
                  backgroundImage: `url("${
                    service.getFilePreview(data.featured_image).href
                  }")`,
                }}
              ></div>
            </div>

            <div
              id="infos"
              className="w-[50%] h-full border-l-2 border-r-2  border-gray-500"
            >
              <div
                id="blogInfo"
                className=" h-[25%] flex flex-col justify-start items-center border-b mb-2"
              >
                <h1 className="text-3xl text-[#A5DD9B] sm:text-xl">
                  Title: {data.title}
                </h1>
                <span className="flex items-center justify-center text-white sm:text-[12px]">
                  Status: {data.status}
                  {data.status == "active" ? (
                    <FaRegCircleCheck className="text-lg text-green-500 mt-[2px] ml-2 sm:ml-1 sm:text-sm" />
                  ) : (
                    <RxCrossCircled className="text-xl text-red-500 mt-[2px] ml-2 sm:ml-1 sm:text-sm" />
                  )}
                </span>
              </div>
              <div
                id="content"
                className="bg-[#B5C0D0] w-full h-[70%] overflow-y-scroll p-3 sm:text-sm"
              >
                {data.content}
              </div>
            </div>

            <div
              id="editDelete"
              className="w-[20%] h-full flex items-center justify-end gap-3 sm:flex-col sm:justify-center  sm:ml-3 "
            >
              <Button
                type="primary"
                className="px-4 py-2 flex items-center justify-center sm:px-2 sm:py-1"
              >
                Edit
              </Button>
              <Button
                type="primary"
                className="px-4 py-2 flex items-center justify-evenly sm:px-0 sm:py-0 sm:text-sm "
              >
                <MdDeleteForever className="text-black w-6 h-6 sm:text-sm" />{" "}
                Delete
              </Button>
            </div>
          </div>
        ))}

        {/* {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))} */}
      </div>
    );
  } else {
    // console.log("test pass");
    return (
      <div className="text-white bg-[#151515] h-screen w-full flex-col flex items-center jus">
        <div>
          <Triangle
            visible={true}
            height="200"
            width="180"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>

        <div className="flex flex-col items-start justify-center sm:max-w-56 sm:text-sm">
          <p>Looks like you haven't posted anything yet,</p>
          <Link
            to="/addpost"
            className="cursor-pointer hover:underline text-blue-400 "
          >
            Click here to post.
          </Link>
        </div>
      </div>
    );
  }
}

export default YourPosts;
