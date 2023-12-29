import React from "react";
import { Link } from "react-router-dom";
const PostCard = ({ targetLink, title, image, summary }) => {
  return (
    <Link
      to={`/posts/${targetLink}`}
      className=" w-[calc(100%-0.5rem)] flex flex-col sm:w-[calc(50%-1rem)] md:w-[calc(33%-2rem)] border border-[rgba(0,0,0,0.5)] rounded-md mb-4"
    >
      <div className="grid place-items-center">
        <img src={image} className="w-full h-40 object-cover" />
      </div>
      <div className="text-center px-2">
        <h3 className="text-md uppercase my-1 font-semibold">{title}</h3>
        <p>{summary}</p>
      </div>
    </Link>
  );
};

export default PostCard;
