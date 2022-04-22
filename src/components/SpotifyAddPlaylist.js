//This Class is used to Create a playlist

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SpotifyAddPlaylist = () => {
	const USER_ID = localStorage.getItem('userID');
	const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/users/${USER_ID}/playlists?`;
	const SPOTIFY_PLAYLIST_ENDPOINT =
		'https://api.spotify.com/v1/me/playlists?limit=1';
	const [token, setToken] = useState('');
	const [playlistTitleData, setPlaylistTitleData] = useState('');
	const [playlistDescriptionData, setPlaylistDescriptionData] = useState('');

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		const _pinnedData = JSON.parse(localStorage.getItem('pinnedTrack'));
		if (_pinnedData !== null)
			if (_pinnedData.length > 0) setOpen(true);
			else
				alert(
					'You at least need one pinned song to able creating the playlist!'
				);
		else
			alert('You need at least one pinned song to able creating the playlist!');
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setToken(localStorage.getItem('accessToken'));
		}
	}, []);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (playlistTitleData.length < 10) {
			alert('The Playlist Title at least 10 character!');
		} else handleSetPlaylist();
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
						alert(
							'There is an error when trying fetching the data. Please try again or re-login.'
						);
						console.log(error);
					});
			})
			.catch((error) => {
				alert(
					'There is an error when trying fetching the data. Please try again or re-login.'
				);
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

		axios
			.post(PLAYLIST_COMBINED, '', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then(() => {
				alert('The Playlist has been successfully made!');
				localStorage.clear('pinnedTrack');
				window.location.reload();
			})
			.catch((error) => {
				alert('The is an error when creating playlist, please try again.');
				console.log(error);
			});
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button
					variant="contained"
					onClick={handleClickOpen}
					id="search-button-playlist"
					size="large"
					sx={{
						width: '30%',
						borderRadius: '100px 100px 100px 100px',
					}}
				>
					Create Playlist
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle sx={{ color: 'black' }}>Create a Playlist</DialogTitle>
					<DialogContent>
						<DialogContentText>
							You are about to create a playlist and migrate it into you spotify
							account.
						</DialogContentText>
						<Stack
							direction="column"
							spacing={2}
							justifyContent="center"
							alignItems="center"
							sx={{ width: '100%', marginTop: '30px' }}
						>
							<TextField
								label="Playlist Title"
								value={playlistTitleData}
								variant="outlined"
								onChange={(e) => setPlaylistTitleData(e.target.value)}
								focused
								sx={{ width: '100%', color: 'black' }}
							/>

							<TextField
								label="Playlist Description"
								value={playlistDescriptionData}
								variant="outlined"
								onChange={(e) => setPlaylistDescriptionData(e.target.value)}
								focused
								sx={{ width: '100%', color: 'black' }}
							/>

							<Button
								type="submit"
								onClick={handleFormSubmit}
								id="search-button-playlist"
								variant="contained"
								size="large"
								sx={{
									width: '100%',
									borderRadius: '100px 100px 100px 100px',
								}}
							>
								Commit Creating the Playlist
							</Button>
						</Stack>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default SpotifyAddPlaylist;
