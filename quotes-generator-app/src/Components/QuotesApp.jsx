import React, { useState } from 'react';

const QuotesApp = () => {
    const [quote, setQuote] = useState({
        text: "Ask not what your country cand do for you; ask what you can do for your country.",
        author: "John Kennedy"
    });

    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);


    // const fetchNewQuote = async () => {     const url = "https://official-joke-api.appspot.com/random_joke";     const response = await fetch(url);     const data = await response.json();     setQuote({       text: data.setup,       author: data.punchline,     });   };

    const fetchNewQuote = async () => {
        const url = "https://thequoteapi.com/api/quotes/random/"
        const api_url_key = `${import.meta.env.VITE_QUOTE_API_KEY}`
        const response = await fetch (
          url,
          {headers: {api_key: api_url_key}}
        )
        const data = await response.json()
        setQuote({
          text: data.text,
          author: data.author
        })
      }

      const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
      }

      const addToFavorites = () => {
        const isAlreadyInFavorites = favorites.some((fav) => fav.text === quote.text && fav.author === quote.author);

        if(!isAlreadyInFavorites) {
            setFavorites([...favorites, quote]);
            alert("Quote added to favorites!");
        }
        else{
            alert("This quote is already in your favorites!");
        }
      }


  return (
    <div className="container">
      <div className="quotes-app">
        <h1 className="app-heading">Quote.</h1>
        <div className="fav-container" onClick={toggleFavorites}><p className="fav-text">FAVORITES</p>
        <i className="bx bxs-heart fav-icon"></i></div>
        <div className="quote">
            <i className="bx bxs-quote-alt-left left-quote"></i>
            <p className="quote-text">{quote.text}</p>
            <p className="quote-author">{quote.author}</p>
            <i className="bx bxs-quote-alt-right right-quote"></i>
        </div>
        <div className="circles">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <div className="circle-3"></div>
            <div className="circle-4"></div>
        </div>
        <div className="buttons">
            <button className="btn btn-new" onClick={fetchNewQuote}>New Quote</button>
            <button className="btn btn-fav" onClick={addToFavorites}>Add to Favorites</button>
        </div>
        {showFavorites && (<div className="favorites">
            <button className="btn-close" onClick={toggleFavorites}>
                <i className="bx bx-x"></i>
            </button>
            {favorites.map((favQuote, index) => (<div className="fav-quote" key={index}>
                <div className="fav-quote-delete">
                    <i className="bx bx-x-circle" onClick={() => {
                        const updatedFavorites = favorites.filter((item, i) => i !== index);
                        setFavorites(updatedFavorites)
                        alert("Quote removed from favorites!");
                    }}></i>
                </div>
                <div className="fav-quote-content">
                    <div className="fav-quote-text">{favQuote.text}</div>
                    <div className="fav-quote-author">{favQuote.author}</div>
                </div>
            </div>))}
            
        </div>)}
        
      </div>
    </div>
  )
}

export default QuotesApp
