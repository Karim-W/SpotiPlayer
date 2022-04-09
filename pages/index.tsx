import type { NextPage } from 'next'
import WebPlayback from '../components/WebPlayBack'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = ({ token }: any) => {
	console.log(token)
	return (<>		{token !== "I hate u" && <div className='h-screen w-screen flex flex-row items-center justify-center '><WebPlayback token={token} /></div>}
		{
			token === "I hate u" && <div className='h-screen w-screen flex flex-row items-center justify-center '><Link href='/api/login'><span className='text-6xl'>hi</span></Link></div>
		}</>
	)
}

export async function getStaticProps(context: any) {
	let res = await fetch("http://localhost:3000/api/token")
	let resJson = await res.json()
	console.log(resJson)
	return {
		props: {
			token: resJson.access_token != "" ? resJson.access_token : "I hate u"
		}, // will be passed to the page component as props
	}
}

export default Home
