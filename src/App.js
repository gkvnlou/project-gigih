import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table.js';
import SpotifySearch from './components/SpotifySearch';
import axios from "axios";
import data from './data/all-data';
//http://localhost:3000/#access_token=BQArzFaLx0XPK_NptI6ICpAi4tJpvaFew0ZFNw40ZGCwojiBntrgHIvv4Ni6RVyMJjgsy9I7rQ4DJPGLOCqgH3ECp1QKY4le9bjQyEMni0YOgpqryII1bZ98MWWyxpxEbrSRoVtQ8keurn1c5YK6Mm3Tq1S0lOnkp7lE4uyj_APfbzj5rzjyETjl8UJR-BKtD24&token_type=Bearer&expires_in=3600


function App() {

  const [songData, setSongData] = useState([]);
  const [table, setTable] = useState();
  const [LoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
    const CLIENT_ID = "b91c3357e54045beb7769d42e4b46d9c";
    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
    const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/dashboard/";
    const SCOPES = "playlist-modify-private";
    const HOMEPAGE = "http://localhost:3000/";

    const getReturnedParamsFromSpotifyAuth = (hash) => {
      const stringAfterHashtag = hash.substring(1);
      const paramsInUrl = stringAfterHashtag.split("&");
      const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
      }, {});

      return paramsSplitUp;
    }

    useEffect(() => {
      if(window.location.hash) {
        const {access_token, expires_in, token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash);
        localStorage.clear();
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
        setLoggedIn(true);
      }
    })
    
    const handleLogin = () => {
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES}&response_type=token&show_dialog=true`;
    }
    const handleLogout = () => {
      localStorage.clear();
      window.location = `${HOMEPAGE}`;
    }

    const PrintTrack = () => {
      const dataList =  songData.tracks.items.map((_i) => {
        return (<Table key={_i.id} title={_i.name} artist={_i.artists[0].name} album={_i.album.name} desc={_i.href} image={_i.album.images[0].url} />);
      });
      setTable(dataList);
      return table;
    };

    const LogInCheckHandler = () => {
      if(LoggedIn){
        return (<button onClick={handleLogout} className="submitBtn">Logout</button>);
      }else {
        return (<button onClick={handleLogin} className="submitBtn">Login</button>);
      }
    }

  return (
    <div className="App">
      <header>
      </header>
      <body>
        <div></div>
        <div className="container">
            <div className="containerTextarea">
                <h1 className="webTitle">Blue Player</h1>
            </div>
          <p></p>
          
          <div className="containerBtn">
            <LogInCheckHandler />
          </div>

          <div>
            <p>The most basic Spotify API call.</p>
            <p>Log in first before showing the result</p>
            <p>The search query is searching for track with "UUFO"</p>
            <p>Very buggy, required pressing the button below twice to able to show the result</p>
          </div>

          <SpotifySearch onSearch={(searchData) => {
              setSongData(searchData);
              PrintTrack();
            }} />

          <div>
              <button onClick={() => {setTable([])}} className="submitBtn" style={{marginTop: "10px"}}>Remove Table</button>
          </div>
          
          {table}
        </div>

        <script src="src/index.js"></script>
        
      </body>
    </div>
  );
}

export default App;
