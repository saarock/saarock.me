import React from "react";

import useBlogs from "../../hooks/useBlogs";
import Pagination from "../../components/pagination/Pagination";
import "./Blogs.css";
import Loader from "../../components/loader/Loader";
import { Blog } from "../../interfaces/blogs";
import { useNavigate } from "react-router";



// Sub-component for individual blog card
const BlogCard: React.FC<{ blog: Blog; onReadMore: (id: string) => void }> = ({
  blog,
  onReadMore,
}) => {
  return (
    <li className="blog-item">
      <div className="blog-image-container">
        {blog.imageUrl ? (
          <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
        ) : (
          <div className="default-image">No Image</div>
        )}
      </div>
      <h2>
        {
          blog.title
        }
      </h2>
      <div className="blog-author">By {blog.author}</div>
      <p dangerouslySetInnerHTML={{
        __html:
          blog.childContent?.length > 100
            ? `${blog.childContent?.trim().substring(0, 100)}...`
            : blog?.childContent
      }} />


      <div className="button-container">
        <button
          onClick={() => onReadMore(blog.$id)}
          className="read-more-button"
        >
          Read More
        </button>
      </div>
      <div className="blog-meta">
        <span className="created-at">
          Created At: {new Date(blog.createdAt).toLocaleString().split(",")[0]}
        </span>
      </div>
    </li>
  );
};

// Sub-component for error message
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="blog-container">
    <h1 className="error-message">{message}</h1>
  </div>
);

// Sub-component for loading message
const LoadingMessage: React.FC = () => <Loader />;

// Sub-component for no blogs message
const NoBlogsMessage: React.FC = () => (
  <div className="blog-container">
    <h1 className="no-blogs-message">No blogs found</h1>
  </div>
);



const Blogs: React.FC = () => {
  const { blogs, loading, error, setCurrentPage, totalPages, currentPage } =
    useBlogs();
  const navigate = useNavigate();



  // Handle error state
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Handle loading state
  if (loading) {
    return <LoadingMessage />;
  }

  // Handle empty blogs state
  if (blogs && blogs.length === 0) {
    return <NoBlogsMessage />;
  }

  // Handle opening the blog modal
  const handleReadMore = (blogId: string) => {
    if (!blogId) {
      alert("No blog found.")
    }
    navigate(blogId);

  };



  return (
    <div className="blog-container">
      <h1 className="blogs-title">Blogs</h1>
      <ul className="blog-list">
        {blogs.map((blog: Blog) => (
          <BlogCard key={blog.$id} blog={blog} onReadMore={handleReadMore} />
        ))}
      </ul>
      <Pagination
        onPageChange={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Blogs;
