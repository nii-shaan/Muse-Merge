import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../appwrite/config";
import ReactHtmlParser from "react-html-parser";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Post() {
  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="bg-[#151515] w-full min-h-[800px] text-white flex justify-start items-center flex-col">
      <div
        id="post"
        className="w-[85%] max-w-4xl bg-[#0C2D57] flex items-center flex-col rounded-xl "
      >
        <div
          id="image"
          className=" w-[80%] h-64 mt-5 bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url("${service.getFilePreview(
              post.featured_image
            )}")`,
          }}
        ></div>
        <div id="postDescription" className="w-full ">
          <div
            id="title"
            className="w-full h-10  flex items-center justify-center  text-2xl font-cursive mt-2"
          >
            {" "}
            {post.title}
          </div>
          <div
            id="postDetails"
            className="flex justify-evenly h-8 items-center mt-3  sm:text-[10px]"
          >
            <p>Uploaded by: {post.user_mail}</p>
            <p>Posted on: {post.$createdAt.slice(0, 10)}</p>
          </div>
          <div className="bg-[#9BB8CD] max-h-80 overflow-y-scroll p-5  text-black mt-8">
            {ReactHtmlParser(post.content)}
          </div>
        </div>
      </div>
      <Link to="/">
      <Button className="mt-5">Go Back</Button>
      </Link>
    </div>
  ) : null;
}

export default Post;
