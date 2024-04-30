import { React, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID';
import './Home.css'

export default function Home() {
  const userId = useGetUserID();
  const [cookies, setCookie] = useCookies(['access_Token']);
  const [Blogs, setBlogs] = useState([]);

  const init = async () => {
    const response = await axios.get(`http://localhost:5555/blogs/totalBlogs/${userId}`);
    console.log(response.data);
    setBlogs(response.data);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className='HomePage'>
      <div className='Blogs'>
        <div className='Blog-container'>
          {
            Blogs.map((blog, index) => {
              return (
                <div key={index}>
                  <div className='blog-title'>
                    <h1>{blog.title}</h1>
                  </div>
                  <div className='blog-summary'>
                    <summary>{blog.summary}</summary>
                  </div>
                  <div className='blog-image'>
                    <img className='blog-image-src' src={blog.imageUrl} alt="" />
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
