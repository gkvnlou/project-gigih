import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SONGLISTS_ENDPOINT = 'https://api.spotify.com/v1/search?';
const SONGLIST_TYPE = '&type=track';
const SONGLISTS_LIMIT = '&limit=5';

const SpotifySearch = ({ onSearch }) => {
	const [token, setToken] = useState('');
	const [searchData, setSearchData] = useState('');
	const SONGLIST_QUERY = `q=${searchData}`;

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setToken(localStorage.getItem('accessToken'));
		}
		if (localStorage.getItem('searchData')) {
			setSearchData(localStorage.getItem('searchData'));
		}
	}, []);

	useEffect(() => {
		console.log(
			`${SONGLISTS_ENDPOINT}${SONGLIST_QUERY}${SONGLIST_TYPE}${SONGLIST_TYPE}${SONGLISTS_LIMIT}`
		);
		localStorage.setItem('searchData', searchData);
	}, [SONGLIST_QUERY, searchData]);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		handleGetSonglist();
	};

	const handleGetSonglist = () => {
		const SONGLISTS_COMBINED = `${SONGLISTS_ENDPOINT}${SONGLIST_QUERY}${SONGLIST_TYPE}${SONGLIST_TYPE}${SONGLISTS_LIMIT}`;
		axios
			.get(SONGLISTS_COMBINED, {
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
			<Stack
				direction="row"
				spacing={2}
				justifyContent="center"
				alignItems="center"
			>
				<TextField
					id="search-text-box"
					label="Search"
					value={searchData}
					variant="outlined"
					onChange={(e) => setSearchData(e.target.value)}
					focused
					sx={{ width: '15%' }}
				/>
				<Button
					type="submit"
					onClick={handleFormSubmit}
					id="search-button"
					variant="contained"
					size="large"
				>
					Search
				</Button>
			</Stack>
		</>
	);
};

export default SpotifySearch;
