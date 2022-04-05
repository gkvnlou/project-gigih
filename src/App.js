import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table.js';
import TablePin from './components/TablePin';
import SpotifySearch from './components/SpotifySearch';
import axios from "axios";
import data from './data/all-data';
import SpotifyAddPlaylist from './components/SpotifyAddPlaylist';
import SpotifyFindUserData from './components/SpotifyFindUserData';
import SpotifyAddTrackIntoPlaylist from './components/SpotifyAddTrackIntoPlaylist';
import {useDispatch, useSelector} from 'react-redux';
import {increment, decrement, updateToken} from './actions/index.js';


function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const userToken = useSelector(state => state.token);
  const dispatch = useDispatch();


  const [songData, setSongData] = useState();
  const [table, setTable] = useState();
  const [tablePinned, setTablePinned] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pinnedSongData, setPinnedSongData] = useState([]);
  
    const CLIENT_ID = "b91c3357e54045beb7769d42e4b46d9c";
    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
    const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
    const SCOPES = ["playlist-modify-private", "playlist-read-private"];
    const SCOPES_PARAM = [SCOPES.join("%20")];
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
        localStorage.removeItem("accessToken", "tokenType", "expiresIn");
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
        dispatch(updateToken(access_token));
        setLoggedIn(true);
      }
      
    }, [])


    useEffect(() => {
      printTrackPinned();
    },[pinnedSongData])
    
    const handleLogin = () => {
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_PARAM}&response_type=token&show_dialog=true`;
    }
    const handleLogout = () => {
      localStorage.clear();
      window.location = `${HOMEPAGE}`;
    }





    const printTrackPinned = () => {
      console.log("and for some reason, the data will be");
      const _pinnedData = JSON.parse(localStorage.getItem("pinnedTrack"));

      if(_pinnedData !== null){
        const dataList =  _pinnedData.map((_i) => {
        return (<>
          <TablePin key={_i.id} title={_i.name} artist={_i.artists[0].name} album={_i.album.name} desc={_i.href} image={_i.album.images[0].url} />
          <button onClick={() => {
            removeSongDataFromPinned(_i.id);
          }} className="removePinnedBtn">Remove Pin</button>
        </>);
      });
      setTablePinned(dataList);     
    }else setTablePinned(null);
      return tablePinned;
    }


    const printTrackReg = () => {
      const dataList =  songData.tracks.items.map((_i) => {
        return (<>
          <Table key={_i.id} title={_i.name} artist={_i.artists[0].name} album={_i.album.name} desc={_i.href} image={_i.album.images[0].url} />
          <button onClick={() => {
            copySongDataToPinned(_i.id);
          }} className="setPinnedBtn">Add to Pin</button>
        </>);
      });
      setTable(dataList);
      return table;

    }


    const printTrack = () => {
      printTrackReg();
    };



    // const LocalDataAvailableCheck = () => {
    //   if(pinnedSongData){
    //     return (
    //       <SpotifyAddTrackIntoPlaylist />
    //     );
    //   }else {
    //     return (<>No Data Avaliable</>);
    //   }
    // }

    const LogInCheckHandler = () => {
      if(loggedIn){
        return (<button onClick={handleLogout} className="submitBtn">Logout</button>);
      }else {
        return (<button onClick={handleLogin} className="submitBtn">Login</button>);
      }
    }


     const copySongDataToPinned = (songId) => {
        // if(pinnedSongData !== null){
          let _pinnedData = JSON.parse(localStorage.getItem("pinnedTrack"));
          if(_pinnedData == null){
            _pinnedData = [];
          }

          const dataList = Object.assign({}, ...songData.tracks.items.filter(_i => _i.id === songId));
          console.log("the data you got will be");
          console.log(dataList);

          if(_pinnedData.find(_i => _i.id == songId) == undefined){
            _pinnedData.push(dataList);
            localStorage.setItem("pinnedTrack", JSON.stringify(_pinnedData));
            console.log(_pinnedData);
            console.log(localStorage.getItem("pinnedTrack"));
            setPinnedSongData(_pinnedData);
            console.log("AND, the data still");
            console.log(_pinnedData);
          }
        // }else{
        //   console.log("false");
        //   console.log(songId);
        //   const dataList =  songData.tracks.items.filter(_i => _i.id === songId);
        //   setPinnedSongData(dataList);
        //   localStorage.setItem("pinnedTrack", JSON.stringify(dataList));
        // }
    }

    const removeSongDataFromPinned = (songId) => {
      console.log("PIN REMOVED");

      const _pinnedData = JSON.parse(localStorage.getItem("pinnedTrack"));
      const _i = _pinnedData.filter(_i => _i.id !== songId);
      setPinnedSongData(_i);
      localStorage.setItem("pinnedTrack", JSON.stringify(_i));
    } 


  return (
    <div className="App">
      <header>
      </header>
      <body> 
        <div className="container">
            <div className="containerTextarea">
                <h1 className="webTitle">Blue Player</h1>
            </div>
          <div className="containerBtn">
            <LogInCheckHandler />
          </div>

          <div>
              {loggedIn? <><h3>Logged in!</h3><br />Your token is:<br />{userToken}<SpotifyFindUserData /></> : ''}
          </div>

          <div>
            <p>
              The most basic Spotify API call.<br />
              Log in first before showing the result<br />
              After Login, Search any song you like and Pin it! (Search button <b>REQUIRED</b> to <b>PRESSED TWICE</b>, it's because the network and a bug that i will figure it out later, at least it work)<br />
              Also sorry for the bad UI, Making an API work first is my priority<br />
              <b>CREDITS: P_G2FE2056_KEVIN</b>
            </p>
          </div>

          

          
          
          <div>
            {loggedIn? 
            <>
              <SpotifySearch onSearch={(searchData) => {
                setSongData(searchData);
                printTrack();
              }} />
              
              <div>
                <button onClick={() => {setTable()}} className="submitBtn" style={{marginTop: "10px"}}>Remove Table</button>
              </div>

              <SpotifyAddPlaylist />
              <SpotifyAddTrackIntoPlaylist />
              

              <div>
                {tablePinned}
                {table}
              </div>
            </>
            :
            <>
              <b>Please log in first to able to use the program</b>
            </>
            }
          </div>
            
          </div>

        <script src="src/index.js"></script>
        
      </body>
    </div>
  );
}

export default App;
