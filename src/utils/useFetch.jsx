import { useState, useEffect } from 'react';

// method to convert result array from api into desired format(with parent-child objective)
const handleOkrResult = res =>{         
    return res.data.reduce((acc, val, ind, array) => {
      const children = [];      
      array.forEach((el) => {
         if(children.includes(el?.parent_objective_id) || el?.parent_objective_id === val?.id){
          children.push(el);
         }         
      });      
      return children?.length ? acc.concat({...val, children}) : acc ;
   }, [])  
}

// A custom hook to handle the fetch request
// Accepts url as prop
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();    
      fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(handleOkrResult(data));       
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          setError('Request Cancelled');
        } else {        
          setIsPending(false);
          setError(err.message);
        }
      })   
    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;