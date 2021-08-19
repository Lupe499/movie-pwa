import axios from 'axios'
import { useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar'

export default function SearchSite() {

    var [search, setSearch] = useState([]);

    let url = new URLSearchParams(window.location.search);

       useEffect(
            function() {

                var options = {
                    method: 'GET',
                    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
                    params: {s: url.get("search") , page: '1', r: 'json'},
                    headers: {
                        'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
                        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
                    }
                };
                
                axios.request(options).then(function (response) {
                    setSearch(response.data);
                    
                }).catch(function (error) {
                    console.error(error);
                });
                
            }, [setSearch])
    console.log(search);
    return (
        <div className="wrapper">
            <SearchBar />
            <div className="results">
                {search?.Search?.map(result => {
                    return (
                        
                            <a key={result.imdbID} className="movieLink" href={"./movieinfo/?id=" + result.imdbID}>
                                <h1 key={result.Title}>{result.Title}</h1>
                                <img key={result.Poster} src={result.Poster} alt="poster" />
                            </a>
                        
                    )
                })}
            </div>
        </div>
    )
}
