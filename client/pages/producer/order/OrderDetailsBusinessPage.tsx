import { Box, Avatar, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleBuy } from '../../../components/marketplace/API';
import { fetchToken } from '../../../components/marketplace/token';
import {
	Navbar,
	ImageCard,
	LocationCard,
} from '../../../components/marketplace';
import { deepOrange } from '@mui/material/colors';
import {
	updateMyOrderPaid,
	updateMyOrderDelivery,
} from '../../../components/marketplace/API';

const OrderDetailsBusinessPage = () => {
	const router = useRouter();
	const data = router.query;

	const [orderDetails, setOrderDetails] = useState<any>({});

	const handleDelivery = async () => {
		try {
			const token = fetchToken();
			const res = await updateMyOrderDelivery(token, data.id as string, {
				delivered: true,
			});
			history.back();
		} catch (error) {
			console.log(error);
		}
	};

	const handlePaid = async () => {
		try {
			const token = fetchToken();
			const res = await updateMyOrderPaid(token, data.id as string, {
				paid: true,
			});
			history.back();
		} catch (error) {
			console.log(error);
		}
	};

	const fetchOrderDetails = async () => {
		try {
			const token = fetchToken();
			const res = await getSingleBuy(token, data.id as string);
			const details = res.data.data.data;
			setOrderDetails(details);
		} catch (error) {
			console.log(error);
		}
	};

	const handleStartDelivery = () => {
		window.open(
			`https://www.google.com/maps/dir/?api=1&destination=${Number(
				orderDetails?.consumerProfile?.location?.coordinates[1]
			)},${Number(orderDetails?.consumerProfile?.location?.coordinates[0])}`,
			'_blank'
		);
	};

	useEffect(() => {
		fetchOrderDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	const styles = {
		page: `w-screen flex flex-col justify-center items-center`,
		container: `w-screen max-w-md flex flex-col justify-center items-center`,
		navBox: `w-full px-4 z-50`,
		headerBox: `w-11/12 h-9 mt-20 flex justify-between items-center`,
		headerBar: `w-9/12 h-full border-1 border-light-gray rounded-3xl flex justify-start items-center`,
		imgBox: `ml-3 w-8 h-8 rounded-full`,
		barBox: `w-full flex justify-center items-center mt-3`,
		redBar: `w-40 h-8 bg-dark-red rounded-3xl flex justify-center items-center`,
		greenBar: `w-40 h-8 bg-green rounded-3xl flex justify-center items-center`,
		detailsContainer: `w-11/12 border-1 rounded-2xl border-light-gray flex flex-col justify-start items-center mt-5`,
		smallTxt: `text-2sm font-semibold`,
		smallTxt1: `text-2sm font-semibold ml-3`,
		container1: `w-11/12 rounded-2xl flex flex-col justify-start items-center mt-5 h-36 mb-5`,
		container2: `w-11/12 border-1 rounded-2xl border-light-gray flex flex-col justify-start items-center mt-5 mb-5`,
		btn: `w-11/12 h-8 rounded-2xl bg-green text-2.5sm font-semibold mt-5`,
	};

	return (
		<Box className={styles.page}>
			<Box className={styles.container}>
				<Box className={styles.navBox}>
					<Navbar
						arrow={true}
						orderDetails={true}
						ids={data.id}
						noCart={true}
					/>
				</Box>

				<Box className={styles.headerBox}>
					<span className="text-2sm">Ordered by</span>
					<Box className={styles.headerBar}>
						<Box className={styles.imgBox}>
							{orderDetails?.consumerProfile?.user?.photo ? (
								<ImageCard
									image={orderDetails?.consumerProfile?.user?.photo}
									rounded={true}
								/>
							) : (
								<Avatar
									sx={{
										bgcolor: deepOrange[500],
										width: '32px',
										height: '32px',
									}}
									alt={orderDetails?.consumerProfile?.user?.name}
									src="/broken-image.jpg"
								/>
							)}
						</Box>
						<span className="text-2sm ml-3">
							{orderDetails?.consumerProfile?.user?.name}
						</span>
					</Box>
				</Box>

				<Box className="w-full flex justify-center items-center mt-5">
					<span className="text-2sm font-bold">Status</span>
				</Box>

				<Box className={styles.barBox}>
					{orderDetails?.delivered ? (
						<Box className={styles.greenBar}>
							<span className="text-3sm text-white">Delivered</span>
						</Box>
					) : (
						<Box className={styles.redBar}>
							<span className="text-3sm text-white">Not Delivered</span>
						</Box>
					)}
				</Box>

				<Box className={styles.barBox}>
					{orderDetails?.paid ? (
						<Box className={styles.greenBar}>
							<span className="text-3sm text-white">Paid</span>
						</Box>
					) : (
						<Box className={styles.redBar}>
							<span className="text-3sm text-white">Not Paid</span>
						</Box>
					)}
				</Box>

				<Box className={styles.detailsContainer}>
					<Box className="w-10/12 mt-2">
						<span className="text-2sm font-bold">
							{orderDetails?.cart?.items.length} Products
						</span>
					</Box>
					<Box className="w-10/12 h-10 flex flex-col justify-center items-center mt-3">
						{orderDetails?.cart?.items.map((item: any) => {
							return (
								<Box
									key={item._id}
									className="w-full flex justify-between items-center"
								>
									<Box className="">
										<span className={styles.smallTxt}>
											{item?.orderQuantity} {item?.orderUnit}
										</span>
										<span className={styles.smallTxt1}>
											{item?.ondemandProduct?.name || item?.stockProduct?.name}
										</span>
									</Box>
									<span className={styles.smallTxt}>
										$ {Number(item?.orderTotal).toFixed(3)}
									</span>
								</Box>
							);
						})}
					</Box>

					<Box className="w-11/12 border-1 mt-5 mb-5 border-light-gray"></Box>

					<Box className="w-10/12 flex justify-between items-center">
						<span className={styles.smallTxt}>Subtotal</span>
						<span className={styles.smallTxt}>
							$ {Number(orderDetails?.cart?.subTotal).toFixed(3)}
						</span>
					</Box>

					<Box className="w-10/12 flex justify-between items-center">
						<span className={styles.smallTxt}>Shipping</span>
						<span className={styles.smallTxt}>
							${' '}
							{Number(orderDetails?.totalAmount) -
								Number(orderDetails?.cart?.subTotal)}
						</span>
					</Box>

					<Box className="w-11/12 border-1 mt-5 mb-5 border-light-gray"></Box>

					<Box className="w-10/12 flex justify-between items-center mb-5">
						<span className={styles.smallTxt}>Total</span>
						<span className="text-2sm font-bold">
							$ {Number(orderDetails?.totalAmount).toFixed(3)}
						</span>
					</Box>
				</Box>

				<Box className={styles.container1}>
					<LocationCard
						lat={Number(
							orderDetails?.consumerProfile?.location?.coordinates[1]
						)}
						lng={Number(
							orderDetails?.consumerProfile?.location?.coordinates[0]
						)}
					/>
				</Box>

				<button
					className="w-10/12 h-8 rounded-2xl bg-golden text-2sm font-semibold"
					onClick={handleStartDelivery}
				>
					Start delivery
				</button>

				<Box className={styles.container2}>
					<Box className="w-10/12 flex justify-start items-center mt-3">
						<span className="text-2sm font-bold">Payment</span>
					</Box>

					<Box className="w-10/12 flex flex-col justify-center items-start mt-3 mb-3">
						<span className="text-2sm font-semibold">
							{orderDetails?.consumerProfile?.user?.name}
						</span>
						<span className="text-2sm mt-1">
							<span className="text-2sm font-semibold">Receipt: </span>
							<button className="text-2sm font-semibold bg-green rounded-2xl h-6 w-28 ml-5">
								<a
									href={`https://explorer.celo.org/alfajores/tx/${orderDetails?.receipt}`}
									target="#"
								>
									{`Go to explorer>>`}
								</a>
							</button>
						</span>
					</Box>
				</Box>

				<Box className="mt-5 mb-8 w-full flex flex-col justify-center items-center">
					{orderDetails?.delivered ? (
						<Box></Box>
					) : (
						<button className={styles.btn} onClick={handleDelivery}>
							Delivered
						</button>
					)}

					{orderDetails?.paid ? (
						<Box></Box>
					) : (
						<button className={styles.btn} onClick={handlePaid}>
							Paid
						</button>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default OrderDetailsBusinessPage;
