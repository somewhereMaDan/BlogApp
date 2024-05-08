import { React, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import "./Home.css";
import { toast } from "sonner";

export default function Home() {
  const userId = useGetUserID();
  const [cookies, setCookie] = useCookies(["access_Token"]);
  const [Blogs, setBlogs] = useState([]);
  const [savedBlogs, setsavedBlogs] = useState([]);
  const [Loading, setLoading] = useState(true);

  const init = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedBlogs = async () => {
    try {
      const Response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/savedBlogs/ids/${userId}`
      );
      setsavedBlogs(Response.data.savedBlogs);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
    if (cookies.access_Token) fetchSavedBlogs();
  }, []);

  const saveBlog = async (blogId) => {
    try {
      const newSavedBlogs = [...savedBlogs, blogId];
      setsavedBlogs(newSavedBlogs);

      await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          blogId,
          userId,
        },
        { headers: { authorization: cookies.access_Token } }
      );
      toast.success("Blog saved successfully");
      setLoading(false);
    } catch (err) {
      const revertedSavedBlogs = savedBlogs.filter((id) => id !== blogId);
      setsavedBlogs(revertedSavedBlogs);
      toast.error("Failed to save blog");
      console.log(err);
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const newSavedBlogs = savedBlogs.filter((id) => id !== blogId);
      setsavedBlogs(newSavedBlogs);

      await axios.put(`${import.meta.env.VITE_API_URL}/blogs/delete`, {
        blogId,
        userId,
      });
      toast.success("Blog deleted successfully");
      setLoading(false);
    } catch (err) {
      const revertedSavedBlogs = [...savedBlogs, blogId];
      setsavedBlogs(revertedSavedBlogs);
      console.log(err);
      setLoading(false);
    }
  };

  const isBlogSaved = (blogId) => {
    try{
      return savedBlogs.includes(blogId);
    }catch(err){
      console.log(err);
    }
  };

  if (Loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="HomePage">
      <div className="Blogs">
        <div className="Blog-container">
          {Blogs.map((blog) => {
            return (
              <div className="blog-block" key={blog._id}>
                <div className="blog-title">
                  <h1>{blog.title}</h1>
                </div>
                <div className="blog-username">
                  Created by: {blog.userOwner.username}
                </div>
                <div className="blog-summary">
                  <summary>{blog.summary}</summary>
                </div>
                <div className="blog-image">
                  <img className="blog-image-src" src={blog.imageUrl} alt="" />
                </div>
                {/* <div className="save-blog">
                  <div>
                    <button
                      className="save-blog-btn"
                      onClick={() => saveBlog(blog._id)}
                      disabled={isBlogSaved(blog._id)}
                    >
                      {isBlogSaved(blog._id) ? "Saved" : "Save"}
                    </button>
                  </div>
                  <div>
                    <button
                      className="delete-blog-btn"
                      onClick={() => deleteBlog(blog._id)}
                      disabled={!isBlogSaved(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div> */}
                {cookies.access_Token && (
                  <div className="save-blog">
                    <div>
                      <button
                        className="save-blog-btn"
                        onClick={() => saveBlog(blog._id)}
                        disabled={isBlogSaved(blog._id)}
                      >
                        {isBlogSaved(blog._id) ? "Saved" : "Save"}
                      </button>
                    </div>
                    <div className="delete-blog">
                      <button
                        className="delete-blog-btn"
                        onClick={() => deleteBlog(blog._id)}
                        disabled={!isBlogSaved(blog._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                <div className="blog-description">
                  <div>{blog.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
