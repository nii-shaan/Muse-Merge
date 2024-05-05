import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { PostCard } from "../components/index";
import { authService } from "../appwrite/auth";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

function YourPosts() {
  const [posts, setPosts] = useState([]);
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
      <div className="bg-[#151515] h-screen w-full flex flex-wrap">
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
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
            className="cursor-pointer hover:underline hover:text-blue-400"
          >
            Click here to post.
          </Link>
        </div>
      </div>
    );
  }
}

export default YourPosts;
