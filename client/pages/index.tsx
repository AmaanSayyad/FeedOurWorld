import type { NextPage } from 'next';
import AllFarms from './consumer/AllFarms';
import AllProductPage from './producer/AllProductPage';
import { fetchToken } from '../components/marketplace/token';
import React, { useState, useEffect } from 'react';
import { getMe } from '../components/marketplace/API';

const Home: NextPage = () => {
	const [isConsumer, setIsConsumer] = useState(true);

	const fetchData = async () => {
		try {
			const token = fetchToken();

			if (!token) {
				setIsConsumer(true);
				return;
			}

			const me = await getMe(token);
			const userRole = me?.data?.data?.data?.role;

			setIsConsumer(userRole === 'user');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			{isConsumer ? <AllFarms /> : <AllProductPage />}
		</div>
	);
};

export default Home;
