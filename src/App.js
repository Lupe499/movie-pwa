import MovieInfo from './views/MovieInfo'
import SearchSite from './views/SearchSite'
import { Router, Link } from "@reach/router"

function App() {

  return (
    <div className="App">
      <Router>
        <SearchSite path="/"/>
        <MovieInfo path="/movieinfo"/>
      </Router>
    </div>
  );
}
export default App;
