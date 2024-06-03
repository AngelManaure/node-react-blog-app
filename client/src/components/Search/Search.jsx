function Search({ searchActive, handleSearch }) {
  return (
    <div className={searchActive == true ? "showSearch" : "search"}>
    <div className="closeNav" onClick={handleSearch}>
      <i className="ri-close-line closeNavIcon"></i>
    </div>
    <form className="searchContainer">
      <div className="searchIconContainer">
        <i className="ri-search-line"></i>
      </div>
      <input type="text" className="searchInput" />

      <button className="searchButton" onClick={handleSearch}>
        Buscar
      </button>
    </form>
  </div>
  )
}

export default Search