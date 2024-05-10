import React, { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import EditPost from './EditPost';

export default function MyBlogs() {
  const [MyBlogs, setMyBlogs] = useState([])
  const [TotalBlogs, setTotalBlogs] = useState([])
  const userId = useGetUserID();
  const [cookies, setCookie] = useCookies(["access_Token"]);
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const init = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/totalBlogs/${userId}`
      );
      setMyBlogs(response.data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  const fetchTotalBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/totalBlogs/ids/${userId}`);
      setTotalBlogs(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    init();
    if (cookies.access_Token) fetchTotalBlogs()
  }, []);

  const toDeleteBlog = async (blogId) => {
    try {
      const updatedTotalBlogs = TotalBlogs.filter((id) => id !== blogId);
      setTotalBlogs(updatedTotalBlogs);

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/blogs/totalBlogs/delete`, {
        blogId,
        userId
      });
      const updateMyBlogs = MyBlogs.filter((blogs) => blogs._id !== blogId);
      setMyBlogs(updateMyBlogs);
      toast.success("Blogs deleted from your account successfully");
    }
    catch (err) {
      const revertedSavedBlogs = TotalBlogs.filter((id) => id !== blogId);
      setTotalBlogs(revertedSavedBlogs);
      toast.error("Error while deleting blog");
      console.log(err);
    }
  }

  const isBlogSaved = (blogId) => {
    return TotalBlogs.includes(blogId);
  }

  if (Loading) {
    return <div>Loading...</div>;
  }

  const handleEditClick = (blogId, blogTiTle, blogUsername, blogSummary, blogImageUrl, blogDescription) => {
    navigate(`/edit-post/${blogId}`, {
      state: { 
        blogId,
        blogTiTle,
        blogUsername,
        blogSummary,
        blogImageUrl,
        blogDescription
      }
    });
  };

  return (
    <div className="HomePage">
      <div className="Blogs">
        <div className="Blog-container">
        {MyBlogs.length === 0 && <div className="no-blogs"><h1>No Blogs Created yet !</h1></div>}
          {MyBlogs.map((blog) => {
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
                {cookies.access_Token && (
                  <div className="save-blog">
                    <div>
                      <button
                        className="save-blog-btn"
                        onClick={() => handleEditClick(blog._id, blog.title, blog.userOwner.username, blog.summary, blog.imageUrl, blog.description)}>
                        Edit
                      </button>
                    </div>
                    <div className="delete-blog">
                      <button
                        className="delete-blog-btn"
                        onClick={() => toDeleteBlog(blog._id)}
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