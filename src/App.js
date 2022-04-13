import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table.js';
import TablePin from './components/TablePin';
import SpotifySearch from './components/SpotifySearch';
import axios from 'axios';
import SpotifyAddPlaylist from './components/SpotifyAddPlaylist';
import SpotifyFindUserData from './components/SpotifyFindUserData';
import SpotifyAddTrackIntoPlaylist from './components/SpotifyAddTrackIntoPlaylist';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, updateToken } from './actions/index.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Button from '@mui/material/Button';

function App() {
	const counter = useSelector((state) => state.counter); // Just a normal counter for testing purposes
	const isLogged = useSelector((state) => state.isLogged); // Log in Status (Not Used)
	const userToken = useSelector((state) => state.token); // Storing user token into reducer
	const dispatch = useDispatch();
	const [isPinned, setIsPinned] = useState();
	const [isSearched, setIsSearched] = useState();
	const [table, setTable] = useState(); // set Table
	const [tablePinned, setTablePinned] = useState(); // set Pinned Table
	const [loggedIn, setLoggedIn] = useState(false); // Log in Status in Hooks
	const [pinnedSongData, setPinnedSongData] = useState([]); // Storing pinned song

	const CLIENT_ID = 'b91c3357e54045beb7769d42e4b46d9c';
	const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
	const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000/create-playlist';
	const SCOPES = ['playlist-modify-private', 'playlist-read-private'];
	const SCOPES_PARAM = [SCOPES.join('%20')];
	const HOMEPAGE = 'http://localhost:3000/';

	const getReturnedParamsFromSpotifyAuth = (hash) => {
		const stringAfterHashtag = hash.substring(1);
		const paramsInUrl = stringAfterHashtag.split('&');
		const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
			console.log(currentValue);
			const [key, value] = currentValue.split('=');
			accumulator[key] = value;
			return accumulator;
		}, {});

		return paramsSplitUp;
	};

	useEffect(() => {
		if (window.location.hash) {
			const { access_token, expires_in, token_type } =
				getReturnedParamsFromSpotifyAuth(window.location.hash);
			localStorage.removeItem('accessToken', 'tokenType', 'expiresIn');
			localStorage.setItem('accessToken', access_token);
			localStorage.setItem('tokenType', token_type);
			localStorage.setItem('expiresIn', expires_in);
			dispatch(updateToken(access_token)); //Reducer
			setLoggedIn(true);
		}
	}, [dispatch]);

	useEffect(() => {
		console.log('and for some reason, the data will be');
		const _pinnedData = JSON.parse(localStorage.getItem('pinnedTrack'));

		if (_pinnedData !== null) {
			const dataList = _pinnedData.map((_i) => {
				return (
					<div className="cardWrapper">
						<TablePin
							key={_i.id}
							title={_i.name}
							artist={_i.artists[0].name}
							album={_i.album.name}
							desc={_i.href}
							image={_i.album.images[0].url}
						/>
						<button
							onClick={() => {
								removeSongDataFromPinned(_i.id);
							}}
							className="removePinnedBtn"
						>
							Remove Pin
						</button>
					</div>
				);
			});
			setTablePinned(dataList);
		} else {
			setTablePinned(null);
		}
	}, [pinnedSongData]);

	const handleLogin = () => {
		window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_PARAM}&response_type=token&show_dialog=true`;
	};
	const handleLogout = () => {
		localStorage.clear();
		window.location = `${HOMEPAGE}`;
	};

	const printTrackReg = (searchData) => {
		const dataList = searchData.tracks.items.map((_i) => {
			return (
				<div className="cardWrapper">
					<Table
						key={_i.id}
						title={_i.name}
						artist={_i.artists[0].name}
						album={_i.album.name}
						desc={_i.href}
						image={_i.album.images[0].url}
					/>
					<button
						onClick={() => {
							copySongDataToPinned(_i.id, searchData);
						}}
						className="setPinnedBtn"
					>
						Add to Pin
					</button>
				</div>
			);
		});
		setTable(dataList);
		return table;
	};

	const LogInCheckHandler = () => {
		if (loggedIn) {
			return (
				<Button
					type="submit"
					onClick={handleLogout}
					variant="outlined"
					size="medium"
				>
					Logout
				</Button>
			);
		} else {
			return (
				<Button
					type="submit"
					onClick={handleLogin}
					variant="contained"
					size="medium"
				>
					Login
				</Button>
			);
		}
	};

	const copySongDataToPinned = (songId, searchData) => {
		let _pinnedData = JSON.parse(localStorage.getItem('pinnedTrack'));
		if (_pinnedData == null) {
			_pinnedData = [];
		}

		const dataList = Object.assign(
			{},
			...searchData.tracks.items.filter((_i) => _i.id === songId)
		);
		console.log('the data you got will be');
		console.log(dataList);

		if (_pinnedData.find((_i) => _i.id === songId) === undefined) {
			_pinnedData.push(dataList);
			localStorage.setItem('pinnedTrack', JSON.stringify(_pinnedData));
			setPinnedSongData(_pinnedData);
		}
	};

	const removeSongDataFromPinned = (songId) => {
		console.log('PIN REMOVED');

		const _pinnedData = JSON.parse(localStorage.getItem('pinnedTrack'));
		const _i = _pinnedData.filter((_i) => _i.id !== songId);
		setPinnedSongData(_i);
		localStorage.setItem('pinnedTrack', JSON.stringify(_i));
	};

	useEffect(() => {
		if (tablePinned === undefined || tablePinned === null) {
			setIsPinned('');
		} else if (tablePinned.length !== 0) {
			const _i = (
				<div colSpan={3} className="pinnedList">
					Pinned Song List! 📌
				</div>
			);
			setIsPinned(_i);
		} else setIsPinned('');
	}, [tablePinned]);

	useEffect(() => {
		if (table === undefined || table === null) {
			setIsSearched('');
		} else if (table.length !== 0) {
			const _i = (
				<div colSpan={3} className="searchedList">
					Search result 🔍
				</div>
			);
			setIsSearched(_i);
		} else setIsSearched('');
	}, [table]);

	return (
		//Web render
		<div className="App">
			<header></header>
			<body>
				<div className="containerTextarea">
					<h1 className="webTitle">Blue Player</h1>
				</div>
				<div className="containerBtn">
					<LogInCheckHandler />
				</div>
				<Router>
					<Switch>
						<Route path="/create-playlist">
							{loggedIn ? (
								<>
									<div>
										{loggedIn ? (
											<>
												<h3>Logged in!</h3>
												<SpotifyFindUserData />
											</>
										) : (
											<Redirect to="/" />
										)}
									</div>
									<div>
										<p>
											The most basic Spotify API call.
											<br />
											Sorry for the bad UI, Making an API work first is my
											priority
											<br />
											<b>CREDITS: P_G2FE2056_KEVIN</b>
										</p>
									</div>
									<b>Search</b>
									<SpotifySearch
										onSearch={(searchData) => {
											printTrackReg(searchData);
										}}
									/>
									<br />
									<b>Making Playlist</b>
									<SpotifyAddPlaylist />
									<SpotifyAddTrackIntoPlaylist />
									<div className="table">
										{isPinned}
										{tablePinned}

										<div style={{ marginTop: '10px' }} />
										{isSearched}
										{table}
									</div>
								</>
							) : (
								<div>Error</div>
							)}
						</Route>
						<Route path="/">
							<div>
								<p>
									Spotify API Call for GENERASI GIGIH 2.0's Homework Project
									<br />
									<b>Please log in first to able to use the program</b>
									<br />
									<br />
									<b>CREDITS: P_G2FE2056_KEVIN</b>
								</p>
							</div>
						</Route>
					</Switch>
				</Router>

				<script src="src/index.js"></script>
			</body>
		</div>
	);
}

export default App;
