import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../config/axios'
import { GET } from '../../../constants/httpMethod'
import '../../../util/GlobalStyle/GlobalStyle.css';
import './BlogDetails.css'

export default function BlogDetails() {
    const { blogID } = useParams()
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                const response = await api[GET](`/blogs/${blogID}`);
                setBlog(response.data.data);
            } catch (err) {
                console.error("Error fetching lab details: ", err);
            }
        }
        fetchCategoryName();

    }, [blogID])

    console.log(blog)

    return (
        <div className='fixed-header blog-details-container'>
            <div className='text-center' style={{ color: '#000F8F' }}>
                <h3 className="blog-title">{blog?.blogName}</h3>
            </div>
            <div className="container blog-details">
                <img className="blog-image" src={blog?.image} alt={blog?.blogName} />
                <p className="blog-content">{blog?.content}</p>
                <p className="blog-date">Post at: {blog?.createDate}</p>
            </div>
        </div>
    )
}
