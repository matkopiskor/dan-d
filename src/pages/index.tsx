import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const getReturnValues = (countDown: number) => {
	// calculate time left
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
	const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

	return [days, hours, minutes, seconds];
};

const useCountdown = (targetDate: Date) => {
	const countDownDate = new Date(targetDate).getTime();

	const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(countDownDate - new Date().getTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [countDownDate]);

	return getReturnValues(countDown);
};

const danD = new Date('2024-09-09');

const Home: NextPage = () => {
	const [days, hours, minutes, seconds] = useCountdown(danD);
	return (
		<>
			<Head>
				<title>Dan D - Mia i Matko</title>
				<meta name='description' content='Countdown...' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='w-full flex flex-col items-center justify-center min-h-screen'>
				<div className='w-full min-w-screen min-h-screen bg-yellow-500 flex items-center justify-center px-5 py-5'>
					<div className='text-yellow-100'>
						<h1 className='text-3xl text-center mb-3 font-extralight'>Dan D</h1>
						<div className='text-6xl text-center flex w-full items-center justify-center'>
							<div className='text-2xl mr-1 font-extralight'>in</div>
							<div className='mx-1 p-2 bg-white text-yellow-500 rounded-lg'>
								<div className='font-mono leading-none' x-text='days'>
									{days}
								</div>
								<div className='font-mono uppercase text-sm leading-none'>Days</div>
							</div>
							<div className='mx-1 p-2 bg-white text-yellow-500 rounded-lg'>
								<div className='font-mono leading-none' x-text='hours'>
									{hours}
								</div>
								<div className='font-mono uppercase text-sm leading-none'>Hours</div>
							</div>
							<div className='mx-1 p-2 bg-white text-yellow-500 rounded-lg'>
								<div className='font-mono leading-none' x-text='minutes'>
									{minutes}
								</div>
								<div className='font-mono uppercase text-sm leading-none'>Minutes</div>
							</div>
							<div className='text-2xl mx-1 font-extralight'>and</div>
							<div className='mx-1 p-2 bg-white text-yellow-500 rounded-lg'>
								<div className='font-mono leading-none' x-text='seconds'>
									{seconds}
								</div>
								<div className='font-mono uppercase text-sm leading-none'>Seconds</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
