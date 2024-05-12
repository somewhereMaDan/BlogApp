import { useState, React, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { toast } from "sonner";

export default function SavedBlogs() {
  const userId = useGetUserID();
  const [savedBlogs, setsavedBlogs] = useState([]);

  const init = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/savedBlogs/${userId}`
      );
      setsavedBlogs(response.data.savedBlogs);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const deleteBlog = async (blogId) => {
    try {

      await axios.put(`${import.meta.env.VITE_API_URL}/blogs/delete`, {
        blogId,
        userId,
      });

      const newSavedBlogs = savedBlogs.filter((blog) => blog._id !== blogId);
      setsavedBlogs(newSavedBlogs);

      toast.success("Blog deleted successfully");
    } catch (err) {
      toast.error("Error while deleting blog");
      console.log(err);
    }
  };

  const isBlogSaved = (blogId) => {
    return savedBlogs.includes(blogId);
  };


  return (
    <div className="HomePage">
      <div className="Blogs">
        <div className="Blog-container">
          {savedBlogs.length === 0 && <div className="no-blogs"><h1>No saved blogs</h1></div>}
          {
            savedBlogs.map((blog) => {
              return (
                <div className="blog-block" key={blog._id}>
                  <div key={blog._id}>
                    <div className="blog-title">
                      <h1>{blog.title}</h1>
                    </div>
                    <div className="blog-username">
                      Created by: {blog.userOwner.username}
                    </div>
                    <div className="blog-summary">
                      <div>{blog.summary}</div>
                    </div>
                    <div className="blog-image">
                      <img className="blog-image-src" src={blog.imageUrl} alt="" />
                    </div>
                    <div className="delete-div">
                      <button
                        className="delete-blog-btn"
                        onClick={() => deleteBlog(blog._id)}
                        disabled={isBlogSaved(blog._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="blog-description">
                      <div>{blog.description}</div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
