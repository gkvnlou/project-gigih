import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SPOTIFY_USERDATA_ENDPOINT = 'https://api.spotify.com/v1/me';
const SPOTIFY_PLAYLIST_ENDPOINT =
	'https://api.spotify.com/v1/me/playlists?limit=1';

const SpotifyFindUserData = () => {
	const [token, setToken] = useState('');
	const [userID, setUserID] = useState('');
	const [userPlaylistID, setUserPlaylistID] = useState('');
	const [userPlaylistName, setUserPlaylistName] = useState('');

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setToken(localStorage.getItem('accessToken'));
		}
	}, []);

	axios
		.get(SPOTIFY_USERDATA_ENDPOINT, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((response) => {
			setUserID(response.data.id);
		})
		.catch((error) => {
			console.log(error);
		});

	localStorage.setItem('userID', userID);

	axios
		.get(SPOTIFY_PLAYLIST_ENDPOINT, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((response) => {
			setUserPlaylistID(response.data.items[0].id);
			setUserPlaylistName(response.data.items[0].name);
		})
		.catch((error) => {
			console.log(error);
		});

	localStorage.setItem('userPlaylistID', userPlaylistID);

	return (
		<>
			<p>
				Spotify ID
				<br />[ {userID} ]
			</p>
			<p>
				Selected Playlist
				<br />[ {userPlaylistName} ]
				<br />[ {userPlaylistID} ]
				<br />
				(Playlist is selected on your most recent one)
			</p>
		</>
	);
};

export default SpotifyFindUserData;
