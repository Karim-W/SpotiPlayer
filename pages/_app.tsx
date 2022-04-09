import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return <>
		{/* <script src="https://sdk.scdn.co/spotify-player.js"></script> */}
		<Component {...pageProps} /></>


}

export default MyApp
