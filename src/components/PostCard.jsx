import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featured_image }) {
  // console.log(service.getFilePreview(featured_image).href); PASSED
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-full bg-red-100 rounded-xl p-4 text-black">
        <div className="w-full h-full flex flex-col justify-start mb-4 ">
          <div
            id="image"
            className={`bg-[url('${
              service.getFilePreview(featured_image).href
            }')] w-full h-40`}
          ></div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
