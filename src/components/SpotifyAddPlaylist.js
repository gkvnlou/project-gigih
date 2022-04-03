import React, { useState, useEffect } from "react";
import axios from "axios";
import App from "../App";


const SpotifyAddPlaylist = ({onSearch}) => {
    const USER_ID = localStorage.getItem("userID");
    const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/users/${USER_ID}/playlists?`;
    
    const [token, setToken] = useState("");
    const [playlistTitleData, setPlaylistTitleData] = useState("");
    const [playlistDescriptionData, setPlaylistDescriptionData] = useState("");

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
        }
    }, []);


    useEffect(() => {
        console.log(`${PLAYLIST_ENDPOINT}`);
        
        //localStorage.setItem("searchData", searchData);
    }, [playlistTitleData]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSetPlaylist();
    };
    

    const handleSetPlaylist = () => {
        console.log(`PINNED TRACK DATA`);

        const _jsonPlaylist = {
            "name": `${playlistTitleData}`,
            "description": `${playlistDescriptionData}`,
            "public": false
          }

        const PLAYLIST_COMBINED = `${PLAYLIST_ENDPOINT}`;
        
        axios
        .post(PLAYLIST_COMBINED, _jsonPlaylist, {
            headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': "Bearer " + token,
            },
        })
        .then((response) => {
            onSearch(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    };

    return (
    <>
        <form onSubmit={handleFormSubmit}>
            <ul style={{listStyleType: "none"}}>
                <li>
                    Title <input type="text" name="searchData" value={playlistTitleData} onChange={(e) => setPlaylistTitleData(e.target.value)} className="searchBar"/>
                </li>
                <li>
                    Description <input type="text" name="description" value={playlistDescriptionData} onChange={(e) => setPlaylistDescriptionData(e.target.value)} className="searchBar"/>      
                </li>
                <li>
                    <button type="submit" style={{width: "100px", borderRadius: "100px", marginTop: "10px"}} className="submitBtn"> Create Playlist </button>
                </li>
            </ul>
            After Making Playlist, please refresh to update the token!
        </form>
    </>
    );
}

export default SpotifyAddPlaylist;