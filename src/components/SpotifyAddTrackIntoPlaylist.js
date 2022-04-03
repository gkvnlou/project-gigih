import React, { useState, useEffect } from "react";
import axios from "axios";
import App from "../App";

const SpotifyAddTrackIntoPlaylist = ({onSearch}) => {

   


    const [token, setToken] = useState("");
    const [playlistTitleData, setPlaylistTitleData] = useState("");
    const [playlistDescriptionData, setPlaylistDescriptionData] = useState("");

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
        }
    }, []);


    

    const handleAddTrackIntoPlaylist = () => {

        const PLAYLIST_ID = localStorage.getItem("playlistID");
        console.log(PLAYLIST_ID);
        const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?uris=`;
        console.log(PLAYLIST_ENDPOINT);
        const _pinnedData = JSON.parse(localStorage.getItem("pinnedTrack"));
        let TRACK_ID = [];
            if(_pinnedData !== null){
            TRACK_ID = _pinnedData.map((e) => {
                return e.id;
            })
        }
    
        const TRACK_ID_PARAM = "spotify%3Atrack%3A" + TRACK_ID.join("%2Cspotify%3Atrack%3A");
    
        console.log(TRACK_ID_PARAM);
    


        console.log("the Combined String is");
        console.log(TRACK_ID_PARAM);
            console.log(`PINNED TRACK DATA`);

            const _jsonPlaylist = {
                "name": `${playlistTitleData}`,
                "description": `${playlistDescriptionData}`,
                "public": false
            }

            const PLAYLIST_COMBINED = `${PLAYLIST_ENDPOINT}${TRACK_ID_PARAM}`;
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(PLAYLIST_COMBINED);

            axios
            .post(PLAYLIST_COMBINED,"", {
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
        <>
            <button onClick={handleAddTrackIntoPlaylist} style={{width: "250px", borderRadius: "100px", marginTop: "20px"}} className="submitBtn"> Add Song Into Playlist </button>
        </>
        );
}

export default SpotifyAddTrackIntoPlaylist;