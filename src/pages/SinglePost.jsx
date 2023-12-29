import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { MdDeleteForever } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

import { headers, getSinglePost, deletePost } from "../utils/Urls";
import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";

import AppContext from "../../store/store";

const ForumDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { postId } = useParams();
  const navigate = useNavigate();

  const context = useContext(AppContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        let response = await fetch(getSinglePost(postId), {
          method: "GET",
          headers,
          credentials: "include",
        });
        response = await response.json();

        if (response.success == true) {
          setPost(response.post);
        } else {
          let errorMessage;
          if (response.message.includes("not authorized")) {
            errorMessage = "Please sigin to read more";
          } else {
            errorNotification(errorMessage || "Failed to fetch post");
          }
        }
        setLoading(false);
      } catch (error) {
        errorNotification("Failed to fetch post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const deleteHandler = async (e) => {
    try {
      let response = await fetch(deletePost(postId), {
        method: "DELETE",
        headers,
        credentials: "include",
      });
      response = await response.json();
      if (response.success) {
        successNotification("Post deleted successfully");
        context.setUpdatedUser(response.user);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        errorNotification(response.message || "Something went deleting post");
      }
    } catch (error) {
      errorNotification(error.message || "Something went deleting post");
    }
  };
  return (
    <>
      <section>
        <div className="max-w-5xl mx-auto mt-8 relative">
          {loading ? (
            <p>Loading...</p>
          ) : post ? (
            <>
              {context.isLoggedIn && (
                <div className="mb-4 justify-center md:absolute flex items-cen md:items-center gap-4 md:right-2 top-2">
                  <MdDeleteForever
                    className="text-xl cursor-pointer"
                    onClick={() => {
                      deleteHandler();
                    }}
                  />
                  <Link to={`/posts/edit/${postId}`}>
                    <FiEdit2 className="text-xl cursor-pointer" />
                  </Link>
                </div>
              )}
              <div className="max-w-lg mx-auto px-4">
                <div className="flex justify-center">
                  <img src={post.featuredImage} alt={post.title} />
                </div>
                <h1 className="text-center text-3xl md:text-5xl my-2">
                  {post.title}
                </h1>
                <p className="text-center">{post.content}</p>
              </div>
            </>
          ) : (
            <div className="h-[70vh] grid place-items-center">
              <p className="text-center">No data available</p>
            </div>
          )}
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ForumDetailPage;
