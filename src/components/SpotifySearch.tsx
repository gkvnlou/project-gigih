import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SONGLISTS_ENDPOINT = 'https://api.spotify.com/v1/search?';
const SONGLIST_TYPE = '&type=track';
const SONGLISTS_LIMIT = '&limit=5';

export interface Root {
	tracks: Tracks;
}

export interface Tracks {
	href: string;
	items: Item[];
	limit: number;
	next: string;
	offset: number;
	previous: any;
	total: number;
}

export interface Item {
	album: Album;
	artists: Artist2[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIds;
	external_urls: ExternalUrls4;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

export interface Album {
	album_type: string;
	artists: Artist[];
	available_markets: string[];
	external_urls: ExternalUrls2;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface ExternalUrls2 {
	spotify: string;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface Artist2 {
	external_urls: ExternalUrls3;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalUrls3 {
	spotify: string;
}

export interface ExternalIds {
	isrc: string;
}

export interface ExternalUrls4 {
	spotify: string;
}

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

	const handleResponse: FC<Root> = (response) => {
		return onSearch(response);
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
				handleResponse(response.data);
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
