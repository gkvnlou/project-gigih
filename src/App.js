import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table.tsx';
import TablePin from './components/TablePin.tsx';
import SpotifySearch from './components/SpotifySearch.tsx';
import SpotifyAddPlaylist from './components/SpotifyAddPlaylist';
import SpotifyFindUserData from './components/SpotifyFindUserData.js';
import { useDispatch } from 'react-redux';
import { updateToken } from './actions/index.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import './assets/go-musik-logo.png';
import AboutMeContent from './components/AboutMeContent';
import TutorialButton from './components/TutorialButton';

function App() {
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
							duration={parseInt(_i.duration_ms)}
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
						duration={_i.duration_ms}
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
					sx={{
						backgroundColor: 'green',
						'&:hover': { backgroundColor: 'darkgreen' },
					}}
				>
					Login Using Spotify
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
					<h4 style={{ fontWeight: 'normal' }}>Pinned Song List! 📌</h4>
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
					<h4 style={{ fontWeight: 'normal' }}>Search result 🔍</h4>
				</div>
			);
			setIsSearched(_i);
		} else setIsSearched('');
	}, [table]);

	const GetURLData = () => {
		console.log(window.location.href.search(/about/i));
		if (window.location.href.search(/about/i) === -1) {
			console.log('true');
			localStorage.setItem('linkPlusToken', window.location.href);
			return (
				<a href={window.location.href}>
					<h3>Playlist</h3>
				</a>
			);
		} else {
			console.log('false');
			return (
				<a href={localStorage.getItem('linkPlusToken')}>
					<h3>Playlist</h3>
				</a>
			);
		}
	};

	return (
		//Web render
		<div className="App">
			<body>
				{loggedIn || window.location.href.search(/about/i) !== -1 ? (
					<>
						<header>
							<img
								className="homeLogo"
								src={require('./assets/go-musik-logo.png')}
								alt="not found"
								style={{ marginLeft: '30px' }}
							/>
							<ul className="headerMenu">
								<li>
									<GetURLData />
								</li>
								<li>
									<a href="/about">
										<h3>About</h3>
									</a>
								</li>
							</ul>
							<div
								style={{
									display: 'flex',
									width: '50vw',
									justifyContent: 'flex-end',
								}}
							>
								<h3>
									<a href={HOMEPAGE}>Logout</a>
								</h3>
							</div>
						</header>
					</>
				) : (
					''
				)}

				<Router>
					<Switch>
						<Route path="/create-playlist">
							{loggedIn ? (
								<>
									<SpotifyFindUserData />
									<TutorialButton />
									<div className="bodyContent">
										<div className="searchContainer">
											<h1 style={{ fontWeight: 'lighter', fontSize: '50px' }}>
												Search
											</h1>
											<SpotifySearch
												onSearch={(searchData) => {
													printTrackReg(searchData);
												}}
											/>
										</div>
										<SpotifyAddPlaylist />

										<div className="table">
											{isPinned}
											{tablePinned}

											<div style={{ marginTop: '10px' }} />
											{isSearched}
											{table}
										</div>
									</div>
								</>
							) : (
								<div>Error</div>
							)}
						</Route>
						<Route path="/about">
							<div className="aboutContent">
								<AboutMeContent />
							</div>
						</Route>
						<Route path="/">
							<div className="homeBarParent">
								<div className="homeLeftBar">
									<div className="homeLeftBarContent">
										<img
											className="homeLogo"
											src={require('./assets/go-musik-logo.png')}
											alt="not found"
										/>
										<p style={{ fontStyle: 'italic' }}>
											Create Playlist Easily!
										</p>
									</div>
								</div>
								<div className="homeMiddleBar"></div>
								<div className="homeRightBar">
									<div className="homeRightBarContent">
										<h1>Start making your playlist now.</h1>
										<LogInCheckHandler />
									</div>
								</div>
							</div>
						</Route>
					</Switch>
				</Router>

				<script src="src/index.js"></script>
			</body>
			<footer>
				<div style={{ marginLeft: '30px' }}>
					Created by <b>KEVIN_P_G2FE2056</b>. Final project for GENERASI GIGIH
					2.0. The "GoMusik" and it's logo is fiction and create by my self and
					have no correlation with GoJek.
					<br />I Swear to God that this project is created by my own hands, and
					i'm ready to receive any consequences if i found cheating when making
					this project.
				</div>
			</footer>
		</div>
	);
}

export default App;
