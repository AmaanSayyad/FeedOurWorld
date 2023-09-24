import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getMyOrdersProducer } from '../../../components/marketplace/API';
import { fetchToken } from '../../../components/marketplace/token';
import { OrderCardComponentBusiness } from '../../../components/business';
import { Navbar } from '../../../components/marketplace';

const AllMyOrders = () => {
	const [myBuy, setMyBuy] = useState<any>([]);

	const fetchMyOrders = async () => {
		try {
			const token = fetchToken();
			const res = await getMyOrdersProducer(token);
			const data = res.data.data.data;
			setMyBuy(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMyOrders();
	}, []);

	const styles = {
		page: `w-screen max-w-md flex flex-col justify-center items-center`,
		navBox: `w-full px-4 z-50`,
		container: `w-full flex flex-col justify-center items-center mt-24`,
	};

	const renderOrderCards = (delivered: boolean) => {
		return myBuy.map((order: any) => {
			if (order.delivered === delivered) {
				return (
					<OrderCardComponentBusiness
						key={order._id}
						id={order._id}
						createdAt={order.createdAt}
					/>
				);
			}
			return null;
		});
	};

	return (
		<Box className="w-screen flex justify-center items-center">
			<Box className={styles.page}>
				<Box className={styles.navBox}>
					<Navbar arrow={true} myOrder={true} noCart={true} />
				</Box>

				<Box className={styles.container}>
					<Box className="w-11/12 flex justify-start items-center">
						<span className="text-2sm font-bold">New</span>
					</Box>

					<Box className="mt-5 w-11/12">{renderOrderCards(false)}</Box>

					<Box className="w-11/12 flex justify-start items-center mt-5">
						<span className="text-2sm font-bold">Delivered</span>
					</Box>

					<Box className="mt-5 w-11/12">{renderOrderCards(true)}</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default AllMyOrders;
