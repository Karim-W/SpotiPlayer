import React, { useState, useEffect } from "react";
import { usePalette } from "react-palette";
const track = {
	name: "",
	album: {
		images: [{ url: "" }],
	},
	artists: [{ name: "" }],
};
function WebPlayback(props) {
	//function to convert rgb values to hex
	const [is_active, setActive] = useState(false);
	const [player, setPlayer] = useState(undefined);
	const [current_track, setTrack] = useState(track);
	const [imgUrl, setImageUrl] = useState("");
	const { data, loading, error } = usePalette(imgUrl);
	const [imgAlt, setImageAlt] = useState("");
	const [songName, setSongName] = useState("");
	const [artistName, setArtistName] = useState("");
	const [albumName, setAlbumName] = useState("");

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		document.body.appendChild(script);
		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "Web Playback SDK",
				getOAuthToken: (cb) => {
					cb(props.token);
					console.log(props.token);
				},
				volume: 0.5,
			});
			if (player) {
				setPlayer(player);
				player.addListener("ready", ({ device_id }) => {
					console.log("Ready with Device ID", device_id);
				});
				player.addListener("not_ready", ({ device_id }) => {
					console.log("Device ID has gone offline", device_id);
				});
				player.addListener("player_state_changed", (state) => {
					if (!state) {
						return;
					}
					console.log(state);
					setTrack(state.track_window.current_track);
					setImageUrl(state.track_window.current_track.album.images[0].url);
					setSongName(state.track_window.current_track.name);
					setArtistName(state.track_window.current_track.artists[0].name);
					setAlbumName(state.track_window.current_track.album.name);
					setActive(true);
					player.getCurrentState().then((state) => {
						!state ? setActive(false) : setActive(true);
					});
				});
				player.connect();
			}
		};
	}, []);
	// if (!is_active) {
	// 	return (
	// 		<>
	// 			<div className="container">
	// 				<div className="main-wrapper">
	// 					<b>
	// 						Instance not active. Transfer your playback using your Spotify app
	// 					</b>
	// 				</div>
	// 			</div>
	// 		</>
	// 	);
	// } else {
	return (
		<>
			<div
				className={`w-full flex flex-col min-h-screen p-4 py-2 gap-4`}
				style={{ backgroundColor: data.vibrant }}
			>
				<img
					src={imgUrl}
					className="w-[35%] aspect-square backdrop-blur-lg drop-shadow-xl shadow-2xl rounded-md "
					alt={imgAlt}
				/>
				<div
					className={`w-[50%] flex flex-col text-center items-center justify-center text-[${data.darkVibrant}]`}
				>
					<div className="text-2xl font-extrabold"> {songName}</div>
					<div className="text-lg opacity-75 font-light">
						{" "}
						{albumName} - {artistName}
					</div>
					<div className="w-full"></div>
				</div>
			</div>
		</>
	);
}
// }

export default WebPlayback;
