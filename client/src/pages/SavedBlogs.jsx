import { useState, React, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID';

export default function SavedBlogs() {
  const userId = useGetUserID();
  const [savedBlogs, setsavedBlogs] = useState([]);

  const init = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/blogs/savedBlogs/${userId}`);
      setsavedBlogs(response.data.savedBlogs);
    } catch (err) {

    }
  }
  useEffect(() => {
    init();
  }, [savedBlogs]);

  const deleteBlog = async (blogId) => {
    try {
      await axios.put("http://localhost:5555/blogs/delete", {
        blogId,
        userId
      });
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  const isBlogSaved = (blogId) => {
    return savedBlogs.includes(blogId);
  }

  return (
    <div className='HomePage'>
      <div className='Blogs'>
        <div className='Blog-container'>
          {
            savedBlogs.map((blog, index) => {
              return (
                <div key={index}>
                  <div className='blog-title'>
                    <h1>{blog.title}</h1>
                  </div>
                  <div className='blog-username'>
                    Created by: {blog.userOwner.username}
                  </div>
                  <div className='blog-summary'>
                    <summary>{blog.summary}</summary>
                  </div>
                  <div className='blog-image'>
                    <img className='blog-image-src' src={blog.imageUrl} alt="" />
                  </div>
                  <div className='delete-div'>
                    <button className='delete-blog-btn' onClick={() => deleteBlog(blog._id)}>Delete</button>
                  </div>
                  <div className='blog-description'>
                    <div>{blog.description}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
