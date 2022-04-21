import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const SPOTIFY_USERDATA_ENDPOINT = 'https://api.spotify.com/v1/me';
export const SPOTIFY_PLAYLIST_ENDPOINT =
	'https://api.spotify.com/v1/me/playlists?limit=1';

const SpotifyFindUserData = () => {
	const [token, setToken] = useState('');
	const [userID, setUserID] = useState('');
	const [userPlaylistFetchStatus, setPlaylistFetchStatus] = useState(false);
	const [userFetchStatus, setUserFetchStatus] = useState(false);

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
			setUserFetchStatus(true);
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
			setPlaylistFetchStatus(true);
		})
		.catch((error) => {
			console.log(error);
		});

	return (
		<div style={{ marginLeft: '10px', position: 'absolute' }}>
			<p>
				Fetching User Database Status
				{userFetchStatus ? (
					<>
						<br />
						<div
							style={{
								width: '50px',
								height: '7px',
								backgroundColor: 'green',
								borderRadius: '100px 100px 100px 100px',
								marginTop: '7px',
							}}
						></div>
					</>
				) : (
					<>
						<>
							<br />
							<div
								style={{
									width: '50px',
									height: '7px',
									backgroundColor: 'red',
									borderRadius: '100px 100px 100px 100px',
									marginTop: '7px',
								}}
							></div>
						</>
					</>
				)}
			</p>
			<p>
				Fetching Playlist Database Status
				{userPlaylistFetchStatus ? (
					<>
						<br />
						<div
							style={{
								width: '50px',
								height: '7px',
								backgroundColor: 'green',
								borderRadius: '100px 100px 100px 100px',
								marginTop: '7px',
							}}
						></div>
					</>
				) : (
					<>
						<>
							<br />
							<div
								style={{
									width: '50px',
									height: '7px',
									backgroundColor: 'red',
									borderRadius: '100px 100px 100px 100px',
									marginTop: '7px',
								}}
							></div>
						</>
					</>
				)}
				<br />
				UserID : {userID}
			</p>
		</div>
	);
};

export default SpotifyFindUserData;
