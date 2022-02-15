import React from 'react'
import Loading from './loading'
import Error from './Error'
import Tours from './Tours'
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading,setLoading]=React.useState(true);
  const [error,setError]=React.useState(false);
  const [tours,setTours]=React.useState([]);
  const removeTour=(id)=>{
    const newTours=tours.filter((tour)=>tour.id!==id);
    setTours(newTours);
  }
  const fetchTours=async()=>{
    setLoading(true);
    try{
      const response=await fetch(url);
      const tours=await response.json();
      setLoading(false);
      setTours(tours);
      setError(false);
    }catch(error){
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }
  React.useEffect(()=>{
    fetchTours();
  },[]);
  if(loading){
    return<main>
      <Loading/>
    </main>
  }
  if(error){
    return(
      <main>
        <Error/>
      </main>
    );
  }
if(tours.length===0){
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button onClick={fetchTours} className="btn">Refresh</button>
        </div>
      </main>
    )
  }
  return(
    <main>
    <Tours tours={tours} removeTour={removeTour}/>
    </main>
  );
}

export default App;
