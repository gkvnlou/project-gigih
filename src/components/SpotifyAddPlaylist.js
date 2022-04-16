import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SpotifyAddPlaylist = () => {
	const USER_ID = localStorage.getItem('userID');
	const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/users/${USER_ID}/playlists?`;
	const SPOTIFY_PLAYLIST_ENDPOINT =
		'https://api.spotify.com/v1/me/playlists?limit=1';
	const [token, setToken] = useState('');
	const [playlistTitleData, setPlaylistTitleData] = useState('');
	const [playlistDescriptionData, setPlaylistDescriptionData] = useState('');
	const [userPlaylistID, setUserPlaylistID] = useState('');

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setToken(localStorage.getItem('accessToken'));
		}
	}, []);

	useEffect(() => {
		console.log(`${PLAYLIST_ENDPOINT}`);
		//localStorage.setItem("searchData", searchData);
	}, [PLAYLIST_ENDPOINT, playlistTitleData]);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		handleSetPlaylist();
	};

	const handleSetPlaylist = () => {
		console.log(`PINNED TRACK DATA`);

		const _jsonPlaylist = {
			name: `${playlistTitleData}`,
			description: `${playlistDescriptionData}`,
			public: false,
		};

		const PLAYLIST_COMBINED = `${PLAYLIST_ENDPOINT}`;

		axios
			.post(PLAYLIST_COMBINED, _jsonPlaylist, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			})
			.then(() => {
				axios
					.get(SPOTIFY_PLAYLIST_ENDPOINT, {
						headers: {
							Authorization: 'Bearer ' + token,
						},
					})
					.then((response) => {
						handleAddTrackIntoPlaylist(response.data.items[0].id);
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleAddTrackIntoPlaylist = (response) => {
		const PLAYLIST_ID = response;
		console.log('THE PLAYLIST ID IS');
		console.log(PLAYLIST_ID);
		const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?uris=`;
		console.log(PLAYLIST_ENDPOINT);
		const _pinnedData = JSON.parse(localStorage.getItem('pinnedTrack'));
		let TRACK_ID = [];
		if (_pinnedData !== null) {
			TRACK_ID = _pinnedData.map((e) => {
				return e.id;
			});
		}

		const TRACK_ID_PARAM =
			'spotify%3Atrack%3A' + TRACK_ID.join('%2Cspotify%3Atrack%3A');

		const PLAYLIST_COMBINED = `${PLAYLIST_ENDPOINT}${TRACK_ID_PARAM}`;
		console.log(PLAYLIST_COMBINED);

		axios
			.post(PLAYLIST_COMBINED, '', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then(() => {
				//window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Stack
				direction="column"
				spacing={2}
				justifyContent="center"
				alignItems="center"
				sx={{ width: '100%' }}
			>
				<TextField
					id="search-text-box"
					label="Playlist Name"
					value={playlistTitleData}
					variant="outlined"
					onChange={(e) => setPlaylistTitleData(e.target.value)}
					focused
					sx={{ width: '30%' }}
				/>

				<TextField
					id="search-text-box"
					label="Playlist Description"
					value={playlistDescriptionData}
					variant="outlined"
					onChange={(e) => setPlaylistDescriptionData(e.target.value)}
					focused
					sx={{ width: '30%' }}
				/>

				<Button
					type="submit"
					onClick={handleFormSubmit}
					id="search-button-playlist"
					variant="contained"
					size="large"
					sx={{ width: '30%' }}
				>
					Create Playlist & Add Pinned Song into it
				</Button>
			</Stack>
		</>
	);
};

export default SpotifyAddPlaylist;
