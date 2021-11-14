import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const[title,setTitle]=useState('');
    const[body,setBody]=useState('');
    const[author,setAuthor]=useState('');
    const[pending,setIsPending]=useState(false);
    const history=useHistory();

    const handleSubmit=(e)=>{
        e.preventDefault();//prevent refresshing
        const blog ={ title, body, author};
        setIsPending(true);
        fetch(' http://localhost:8000/blogs',{//adding new blog directly to json
            method:'post',
            headers: {"content-Type":"application/json"},
            body:JSON.stringify(blog)
        }).then(()=>
        {
            setIsPending(false);
            history.push('/');
        })

    }
    return (

        <div className="create">
            <h2>
                Add a New Blog
            </h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input type="text" 
                required 
                value={ title } 
                onChange={(e)=> setTitle(e.target.value)}
                    />
                <label>Blog body:</label>
                <textarea 
                required
                value={ body }
                onChange={(e)=> setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <input type="text" required
                value={ author }
                onChange={(e)=> setAuthor(e.target.value)}
                /> {/* logic for button change*/}
                {!pending &&<button>Post</button>}
                {pending && <button disabled>Adding blog.....</button>}
            </form>
        </div>
    );
}
 
export default Create;