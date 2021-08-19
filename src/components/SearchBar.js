import "./SearchBar.css"


export default function SearchBar() {

    return (
        <form action="">
            <a href="/" className="title">MovieDB</a>
            <button className="searchBtn" type="submit">Search</button>
            <input className="search" type="text" name="search" id="search" />
        </form>
    )
}
