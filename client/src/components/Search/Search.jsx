import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import { searchPost } from "../../api/posts";

function Search({ searchActive, handleSearch }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchResult, setSearchResult] = useState(false);

    //buscador
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await searchPost(query)
          setResults(response.data);
          setSearchResult(true)
        } catch (error) {
          console.log(error);
        }
      }

      const handleResults = () => {
        if (searchResult == false) {
          setSearchResult(true)
        } else {
          setSearchResult(false)
        }
      }
      
      // useEffect(() => {
      //   if (handleResults) {
      //     setSearchActive(false)
      //   }
      // }, [searchActive])

  return (
    <div className={searchActive == true ? "showSearch" : "search"}>
    <div className="closeSearchModal" onClick={handleSearch}>
      <i className="ri-close-line closeSearch"></i>
    </div>
    <form className="searchContainer" onSubmit={handleSearchSubmit}>
      <div className="searchIconContainer">
        <i className="ri-search-line"></i>
      </div>
      <input 
      type="text" 
      className="searchInput"
      value={query}
      id="search=input"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
      />

      <button className="searchButton">
        Buscar
      </button>
    </form>
    <div className="searchResults">
      {results.map((post) => (
        <div key={post.id} className="searchResult">
          <div className="topsearchResult">
          <h2>{post.title}</h2>
          <Link
          className="searchResultLink"
          to={`/post/${post.id}`} 
          onClick={handleResults}
          >
            Ver
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Search