import React, { useEffect, useState } from 'react'
import '../../../util/GlobalStyle/GlobalStyle.css';
import './BlogPage.css';
import api from '../../../config/axios';
import { GET } from '../../../constants/httpMethod';
import { Link } from 'react-router-dom';

export default function BlogPage() {
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api[GET]('/blogs');
                setBlogs(response.data);
            } catch (err) {
                console.error("Error fetching lab details: ", err);
            }
        }
        fetchBlog();

    }, [])


    return (
        <div className='fixed-header text-center'>
            <h1>Blog</h1>
            <div className='blog-container container'>
              <div className="row">
                {blogs && blogs.map((blog) =>(
                    <div className="col-lg-3 col-md-4" key={blog.blogID}>
                        <div className="blog-card">
                          <img src={blog.image} alt={blog.blogName} />
                          <h3 style={{color: '#000F8F'}}>{blog.blogName}</h3>
                          <Link to={`/blog/${blog.blogID}`}>Read It</Link>
                        </div>
                    </div>
                 )
                )}
              </div>
                
            </div>
        </div>
    )
}
