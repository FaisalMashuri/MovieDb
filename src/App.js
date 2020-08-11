import React, {useState} from 'react'
import Search from './components/Search'
import axios from 'axios'
import Results from './components/Results'
import Popup from './components/Popup'


function App () {
  const [state, setState] = useState({
    s:"",
    result:[],
    selected:{},
  });
  const apiurl = "http://www.omdbapi.com/?apikey=dfe6d885";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s)
      .then(({data}) => {
        console.log(data);
        let result = data.Search;

        setState(prevState =>{
          return {...prevState,result: result}
        })
      });
    }
  }
  const handleInput = (e) =>{
    let s = e.target.value;

    setState(prevState => {
      return {...prevState, s: s }
    });


  }

  const openPopup = id =>{
    axios(apiurl + "&i=" + id)
    .then(({data}) =>{
      let result = data;

      setState(prevState => {
        return {...prevState, selected: result}
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, selected:{}}
    });
  }


  return (
    <div className='App'>
      <header className='App-header'>
        <header>
          <h1>Movie Database</h1>
        </header>
        <main>
          <Search handleInput = {handleInput} search={search}/>

          <Results results={state.result} openPopup={openPopup} />

          {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        </main>

      </header>
    </div>
  )
}

export default App
