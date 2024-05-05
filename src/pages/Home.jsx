import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "antd";
import { CiLogin } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import ReactHtmlParser from "react-html-parser";
import { authService } from "../appwrite/auth";
import { FaRegUserCircle } from "react-icons/fa";

function Home() {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        console.log(posts);
      }
    });
  }, []);

  const status = useSelector((state) => state.authReducer.status);

  // console.log(authService.getCurrentUser());

  if (status) {
    return (
      <div className="bg-[#151515] w-full min-h-[800px] text-white flex flex-wrap px-5">
        {posts.map((post) => (
          <div
            key={post.$id}
            className="bg-[#4D869C] w-72 h-80 mb-10 rounded-xl mx-5 flex flex-col item-center"
          >
            <div
              id="title"
              className="h-[10%]  flex items-center justify-center text-xl font-cursive font-thin text-[#FFF7F1] border-b border-gray-400 mb-2"
            >
              {post.title}
            </div>
            <div id="uploadedBy" className="text-sm flex justify-end pr-2 gap-1">
            <FaRegUserCircle className="h-5 w-5 text-[#B4D4FF]" /><h1 className="inline text-[#C5FF95]">{post.user_mail}</h1>
            </div>

            <div className="h-[45%] w-full bg-contain bg-no-repeat  rounded-xl flex items-center justify-center border-b-2 border-white pt-2">
              <div
                id="featuredImage"
                className="h-full w-[70%] bg-contain bg-no-repeat  rounded-xl  "
                style={{
                  backgroundImage: `url("${
                    service.getFilePreview(post.featured_image).href
                  }")`,
                }}
              ></div>
            </div>
            <div
              id="content"
              className="w-full h-[40%] overflow-y-scroll bg-gray-400 text-sm p-2 text-black"
            >
              {ReactHtmlParser(post.content)}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        {" "}
        <div className="bg-[#151515] h-screen w-full min-h- [700px] text-white flex flex-col items-center justify-start">
          <div className="h-[500px]  w-full flex items-center justify-center flex-col">
            <div id="textArea">
              <span className="text-6xl font-cursive md:text-2xl">
                <Typewriter
                  words={[
                    "Write, Inspire, Connect.",
                    "Write with purpose",
                    "Connect with passion",
                    "Join the conversation",
                    "Write your story",
                    "Your story",
                    "Our community",
                    "Start writing.",
                  ]}
                  cursor
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </div>

            <div className="h-[60px] w-[300px] flex justify-evenly items-center">
              <Link to="/login">
                <Button
                  ghost
                  className="w-[100px] flex items-center justify-evenly"
                >
                  <CiLogin className="h-[25px] w-[25px]" />
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  ghost
                  className="w-[100px] flex items-center justify-evenly"
                >
                  <SiGnuprivacyguard className="h-[20px] w-[20px]" />
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
