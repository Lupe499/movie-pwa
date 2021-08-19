import MovieInfo from './views/MovieInfo'
import SearchSite from './views/SearchSite'
import { Router, Link } from "@reach/router"
import { useEffect } from 'react'

function App() {
  useEffect(function() {

    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
    });
  },[])

function displayNotification() {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification('Hello world!', {
        vibrate: [200, 100, 200, 500, 100, 300, 200, 400, 2000, 50]
      })
    });
  }
}


  return (
    <div className="App">
        <button onClick={() => displayNotification()}>click</button>
      <Router>
        <SearchSite path="/"/>
        <MovieInfo path="/movieinfo"/>
      </Router>
    </div>
  );
}
export default App;
