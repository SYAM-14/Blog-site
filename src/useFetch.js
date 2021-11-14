import { useState,useEffect } from "react";
const useFetch =(url)=>{

    const[data,setData]=useState(null);
    const[isLoading,setIsloading]=useState(true);
    const[error, setIsError]=useState(null);
    
    useEffect(()=>{
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url,{ signal:abortCont.signal})
            .then(res =>{
                if(!res.ok)
                {
                    throw Error("could not get the object!");
                }
               return res.json();
            })
            .then(data =>{
                console.log(data);
                setData(data);
                setIsloading(false);
                setIsError(null); 
            })
            .catch(err =>{
                if(err.name ==='AbortError'){
                    console.log('fetch aborted');
                }
                else{
                    setIsloading(false);
                    setIsError(err.message);
            }});
            
        }, 1000);

        return()=> abortCont.abort();
        
    },[url]);

    return {data,isLoading,error}
    
}

export default useFetch;