import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id }=useParams();
    const{ data: blog,error,isloading }=useFetch('http://localhost:8000/blogs/'+ id);
    const history =useHistory();
    const handleClick =()=>{
        fetch(' http://localhost:8000/blogs/'+blog.id,{
            method:'DELETE'
        }).then(() =>{
            history.push('/');
        })
    }
    return ( 

        <div className="blog-details">
            { isloading && <div> is loading...</div>}
            { error && <div>{ error }</div>}
            { blog &&(
                <article>
                    <h1>
                        { blog.title }
                    </h1>
                    <h3>
                        Written by { blog.author }
                    </h3>
                    <div>
                        { blog.body }
                    </div>
                    <button onClick={handleClick}>Delete Blog</button>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;