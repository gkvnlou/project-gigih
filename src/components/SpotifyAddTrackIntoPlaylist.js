import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const SpotifyAddTrackIntoPlaylist = ({ onSearch }) => {
	const [token, setToken] = useState('');

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setToken(localStorage.getItem('accessToken'));
		}
	}, []);

	const handleAddTrackIntoPlaylist = () => {
		const PLAYLIST_ID = localStorage.getItem('userPlaylistID');
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
			.then((response) => {
				onSearch(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Button
				type="submit"
				onClick={handleAddTrackIntoPlaylist}
				id="search-button-playlist"
				variant="contained"
				size="large"
				sx={{
					width: '30%',
					marginTop: '50px',
					backgroundColor: 'green',
					'&:hover': { backgroundColor: 'darkgreen' },
				}}
			>
				Add pinned song into playlist
			</Button>
		</>
	);
};

export default SpotifyAddTrackIntoPlaylist;
