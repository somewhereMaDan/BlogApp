import { React, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID';
import './Home.css'

export default function Home() {
  const userId = useGetUserID();
  const [cookies, setCookie] = useCookies(['access_Token']);
  const [Blogs, setBlogs] = useState([]);
  const [savedBlogs, setsavedBlogs] = useState([])

  // const init = async () => {
  //   const response = await axios.get(`http://localhost:5555/blogs/totalBlogs/${userId}`);
  //   console.log(response.data);
  //   setBlogs(response.data);
  // }

  const init = async () => {
    const response = await axios.get(`http://localhost:5555/blogs`);
    setBlogs(response.data);
  }

  const saveBlog = async (blogId) => {
    try {
      const response = await axios.put("http://localhost:5555/blogs", {
        blogId,
        userId
      }
      //  ,{ headers: { authorization: cookies.access_Token } }
      );
      setsavedBlogs(response.data.savedBlogs);
    } catch (err) {
      console.log(err);
    }
  }

  const isBlogSaved = (blogId) => {
    return savedBlogs.includes(blogId);
  }
  useEffect(() => {
    init();
  }, [])

  console.log("savedBlogs", savedBlogs);

  return (
    <div className='HomePage'>
      <div className='Blogs'>
        <div className='Blog-container'>
          {
            Blogs.map((blog, index) => {
              return (
                <div className='blog-block' key={index}>
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
                  <div className='save-blog'>
                    <div>
                      <button className='save-blog-btn' onClick={() => saveBlog(blog._id)} disabled={isBlogSaved(blog._id)}>
                        {
                          isBlogSaved(blog._id) ? "Saved" : "Save"
                        }
                      </button>
                    </div>
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
