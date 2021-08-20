import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import'./MovieInfo.css';

export default function MovieInfo() {
    var url = new URLSearchParams(window.location.search)
    var [movie, setMovie] = useState([])

    useEffect(
        function() {
            const options = {
                method: 'GET',
                url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
                params: {i: url.get("id"), r: 'json'},
                headers: {
                    'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
                  'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                  setMovie(response.data);
              }).catch(function (error) {
                  console.error(error);
              });
        }, [setMovie]
        ) 




//////////////////////////////////////////////////////////////// Data base start
        // Let us open our database
        var [rating, setRating] = useState([])

            function Vote(e) {
                e.preventDefault();

                var movieData = [
                    { movieid: `${url.get("id")}`, movie: `${movie.Title}`, vote: `${e.target[0].value}` }
                ];
                setRating(movieData)
            }

            
            
            const dbName = "MyTestDatabase";
            
            var request = indexedDB.open(dbName, 1);
            
            
            request.onerror = function(event) {
                console.log("wtf");
            };
            
            
            
            
            request.onupgradeneeded = function(event) {
                var db = event.target.result;
                
                
                var objectStore = db.createObjectStore("movie-votes", { keyPath: "movieid" });
                
                objectStore.createIndex("movie", "movie", { unique: false });
                
                objectStore.createIndex("vote", "vote", { unique: false });
                
            };
            request.onsuccess = function(event) {
                var db = request.result;
                
                var ratingObjectStore = db.transaction("movie-votes", "readwrite").objectStore("movie-votes");
                rating.forEach(function(movie) {
                    ratingObjectStore.put(movie)
                    console.log(rating);
                });
                var getData = ratingObjectStore.get(url.get("id"));
                getData.onsuccess = function () {
                    if (!getData.result) return
                    handleResult(getData.result.vote)
                };
                  
            };
            function handleResult(number) {
                document.querySelector(".voteValue").value = number
                setValue(number);
            }
            var [value, setValue] = useState(0);
              
        
    return (
        <>
            <form className="searchForm" action="">
                <a href="/" className="title">MovieDB</a>
            </form>
            <div className="movieInfo">
                <h1>{movie.Title}</h1>
                <img src={movie.Poster} alt="" />
                <div className="plotDiv">   
                    <h2>The plot</h2>
                    <p>{movie.Plot}</p>

                    <h2>Production</h2>
                    <p>{movie.Production}</p>

                    <div className="Allratings">
                        <h2>All ratings</h2>
                        <div className="ratings">
                            <h3>Imdb</h3>
                            <p>{movie.imdbRating}/10</p>
                        </div>

                            {movie?.Ratings?.map(result => {
                                return (
                                    <div key={result.Source} className="ratings">
                                    <h3 key={result.Source}>{result.Source}</h3>
                                    <p key={result.Value}>{result.Value}</p>
                                </div>
                            )
                        })}
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Your Rating</Typography>
                            <Rating name="read-only" value={value} readOnly />
                        </Box>
                        <form className="ratingForm" onSubmit={Vote} action="">
                            <div>
                                <input className="voteValue" min="1" max="5" type="number" />
                                <button className="voteBtn"type="submit">Rate</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
