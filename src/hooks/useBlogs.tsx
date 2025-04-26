import { useEffect, useState } from "react"
import appWriteService from "../services/appwriteService";


const useBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [limit, setLimit] = useState(4);
    const [offset, setOffset] = useState(0);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        async function getBlogs() {
            try {
                setLoading(true);

                const data = await appWriteService.getBlogs(limit, (currentPage - 1) * limit);

                setTotalBlogs(data.total as number);
                setTotalPages(Math.ceil(data.total / limit));


                if (data.documents.length === 0 || data === undefined || data === null) {
                    setError("No blogs Found");
                }

                console.log("Blogs: ", data);
                setBlogs(data.documents as any);

            } catch (error) {
                setError("Error getting blogs: " + error);
            } finally {
                setLoading(false);
            }
        }
        getBlogs();

    }, [currentPage]);

    return {
        blogs, loading, error, setLoading, setBlogs, setError,
        limit, setLimit, offset, setOffset, totalBlogs, setTotalBlogs, totalPages, setTotalPages,
        currentPage, setCurrentPage
    };


}

export default useBlogs