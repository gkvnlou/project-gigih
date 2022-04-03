import React, { useState, useEffect } from "react";
import axios from "axios";
import App from "../App";

const SPOTIFY_USERDATA_ENDPOINT = "https://api.spotify.com/v1/me";
const SPOTIFY_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists?limit=1";

const SpotifyFindUserData = () => {

    const [token, setToken] = useState("");

    const [userID, setUserID] = useState("");
    const [userPlaylist, setUserPlaylist] = useState("");

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
        }
    }, []);



    axios
    .get(SPOTIFY_USERDATA_ENDPOINT, {
        headers: {
        Authorization: "Bearer " + token,
        },
    })
    .then((response) => {
        setUserID(response.data.id);
    })
    .catch((error) => {
        console.log(error);
    });

    localStorage.setItem("userID", userID);

    
    axios
    .get(SPOTIFY_PLAYLIST_ENDPOINT, {
        headers: {
        Authorization: "Bearer " + token,
        },
    })
    .then((response) => {
        setUserPlaylist(response.data.items[0].id);
    })
    .catch((error) => {
        console.log(error);
    });

    localStorage.setItem("playlistID", userPlaylist);


    

    return (
    <>
        <p>Spotify ID<br />[ {userID} ]</p>
        <p>Playlist ID<br />[ {userPlaylist} ]<br />(Playlist is shown on your most recent one)</p>
    </>
    );
}

export default SpotifyFindUserData;