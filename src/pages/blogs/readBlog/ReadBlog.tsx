import "./ReadBlog.css";
import { useParams, useNavigate } from "react-router-dom";
import useBlog from "../../../hooks/useBlog";
import Loader from "../../../components/loader/Loader";

const ReadBlog = () => {
  const { blogId } = useParams();
  const { blog, loading2 } = useBlog(blogId || "no-id");
  const navigate = useNavigate();

  if (loading2) {
    return <Loader />;
  }

  return (
    <>
      {
        blog ?
          <div className="blog-modal-overlay">
            <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => navigate(-1)}>
                ← {/* Back arrow Unicode */}  back
              </button>
              <h2 dangerouslySetInnerHTML={{ __html: blog?.title || "No title" }} />
              <div className="blog-author">By {blog?.author}</div>
              <div className="blog-image">
                <img src={`${blog.imageUrl}`} alt={blog.title} />
              </div>
              <div className="blog-content">
                <p dangerouslySetInnerHTML={{ __html: blog?.content || "No Content" }} />
              </div>
              <div className="blog-metaa">
                <span className="created-at">
                  Created At: {new Date(blog?.createdAt).toLocaleString().split(",")[0]}
                </span>
              </div>
            </div>
          </div> : "No blog found"
      }
    </>
  );
};

export default ReadBlog;
