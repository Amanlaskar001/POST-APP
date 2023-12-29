import React, { useState, useEffect } from "react";
import PostCard from "../components/postcard/PostCard";

import { headers, getAllPosts } from "../utils/Urls";
import { errorNotification } from "../components/shared/notifications/Notification";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await fetch(getAllPosts, {
          method: "GET",
          headers,
          credentials: "include",
        });
        response = await response.json();
        if (response.success) {
          setPosts(response.posts);
        } else {
          errorNotification(
            response.message || "Something wrong went fetching post"
          );
        }
      } catch (error) {
        errorNotification(
          error.message || "Something wrong went fetching post"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <section className="py-6">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : posts.length > 0 ? (
          <div className="max-w-6xl px-2 flex flex-col sm:flex-row justify-between items-center mx-auto">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                targetLink={post._id}
                title={post.title}
                image={post.featuredImage}
                summary={post.summary}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">No posts available.</p>
        )}
      </section>
      <ToastContainer />
    </>
  );
};

export default Home;
