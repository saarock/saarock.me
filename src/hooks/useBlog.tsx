import { useEffect, useState } from 'react'
import { Blog } from '../interfaces/blogs';
import { useSelector } from 'react-redux';
import useBlogs from './useBlogs';

const useBlog = (blogId: string) => {
    const [blog, setBlog] = useState<Blog | null>(null);



    const blogs = useSelector((state: any) => state.blog) as Blog[];
     useBlogs();
    const [loading2, setLoading2 ] = useState(false)






    useEffect(() => {
        ; (() => {
            setLoading2(true);
            if (blogs && blogs.length > 0) {
                console.log(blogs)
                const blog = blogs.find(blog => blog.$id === blogId);
                if (blog) {
                    setBlog(blog);

                }

            }
            setLoading2(false);

        })();
    }, [blogId, blogs]);


    return { blog, loading2 };


}

export default useBlog