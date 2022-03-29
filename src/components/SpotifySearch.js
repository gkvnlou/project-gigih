import React, { useState, useEffect } from "react";
import axios from "axios";
import App from "../App";

const SONGLISTS_ENDPOINT = "https://api.spotify.com/v1/search?q=UUFO&type=track";

const SpotifySearch = ({onSearch}) => {

    const [token, setToken] = useState("");

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const handleGetSonglist = () => {

        axios
        .get(SONGLISTS_ENDPOINT, {
            headers: {
            Authorization: "Bearer " + token,
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
    <button onClick={handleGetSonglist} style={{width: "250px", borderRadius: "100px"}} className="submitBtn"> Get example search result </button>
    );
}

export default SpotifySearch;