import { Box, Backdrop, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { getSingleStockProduct, getSingleOndemandProduct } from '../API';
import { fetchToken } from '../token';
import router from 'next/router';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			setConfirm: null,
			setStandard: null,
			setExpress: null,
		},
	};
};

function DeliveryOption(props: any) {
	const data = router.query;

	const [businessProfile, setBusinessProfile] = useState<any>({});
	const [disable, setDisable] = useState(true);
	const [openBackdrop, setOpenBackdrop] = useState(false);

	const handleContinue = () => {
		props.setConfirm({
			address: true,
			payment: true,
			debitCard: false,
			order: false,
			value: 2,
		});
	};

	const fetch = async () => {
		setOpenBackdrop(true);
		try {
			const token = fetchToken();
			let product;
			if (data.ondemand) {
				product = await getSingleOndemandProduct(
					data.ondemand as string,
					token,
					'lb'
				);
			} else if (data.stock) {
				product = await getSingleStockProduct(
					data.stock as string,
					token,
					'lb'
				);
			}
			const business = product?.data.data.data.businessProfile;
			setBusinessProfile(business);
			setOpenBackdrop(false);
		} catch (error) {
			console.log(error);
			setOpenBackdrop(false);
		}
	};

	const handleStandard = async () => {
		try {
			setDisable(false);
			props.setStandard(true);
			props.setExpress(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleExpress = async () => {
		try {
			setDisable(false);
			props.setStandard(false);
			props.setExpress(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleOndemand = async () => {
		try {
			setDisable(false);
			props.setStandard(false);
			props.setExpress(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const styles = {
		page: `w-full h-full flex flex-col justify-center items-center`,
		btn: `mr-auto w-36 border-1 border-light-gray h-8 rounded-3xl text-2sm font-semibold focus:bg-dark-gray focus:text-white`,
		bigBtn: `w-11/12 bg-green rounded-3xl text-2sm font-semibold h-8 mb-5 disabled:bg-light-gray`,
		container: `w-11/12 h-52 border-1 border-light-gray rounded-3xl flex flex-col justify-around items-center mb-5`,
		txtSemibold: `text-2sm font-semibold`,
		txtNormal: `text-2sm font-normal`,
	};

	return (
		<Box className={styles.page}>
			<Box className="w-full flex justify-center items-center mb-5">
				<span className={styles.txtSemibold}>Shipping</span>
			</Box>

			<Box
				className={styles.container}
				sx={data.ondemand ? { filter: 'blur(2px)' } : {}}
			>
				<Box className="w-full flex justify-center items-center">
					<span className={styles.txtSemibold}>Stock</span>
				</Box>

				<Box className="w-10/12 flex flex-col justify-between items-center">
					<button className={styles.btn} onClick={handleStandard}>
						Standard
					</button>
					<Box className="w-full flex justify-between items-center mt-2 ml-2">
						<span className={styles.txtNormal}>
							{businessProfile.shippingTimeStandard}
						</span>
						<span className={styles.txtNormal}>
							$ {businessProfile.shippingCostStandard}
						</span>
					</Box>
				</Box>

				<Box className="w-10/12 flex flex-col justify-between items-center mb-3">
					<button className={styles.btn} onClick={handleExpress}>
						Express
					</button>
					<Box className="w-full flex justify-between items-center mt-2 ml-2">
						<span className={styles.txtNormal}>
							{businessProfile.shippingTimeExpress}
						</span>
						<span className={styles.txtNormal}>
							$ {businessProfile.shippingCostExpress}
						</span>
					</Box>
				</Box>
			</Box>

			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={openBackdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			<Box
				className={styles.container}
				sx={!data.ondemand ? { filter: 'blur(2px)' } : {}}
			>
				<Box className="w-full flex justify-center items-center">
					<span className={styles.txtSemibold}>On demand</span>
				</Box>

				<Box className="w-10/12 flex flex-col justify-between items-center">
					<Box className="w-full flex justify-between items-center mt-2 ml-2">
						<button className={styles.btn} onClick={handleOndemand}>
							standard
						</button>
						<span className={styles.txtNormal}>
							$ {businessProfile.shippingOndemandCost}
						</span>
					</Box>
				</Box>

				<Box className="w-11/12 flex flex-col justify-between items-center mb-3">
					<Box className="w-full h-8 border-1 rounded-3xl border-light-gray flex justify-between items-center">
						{/* <span className='text-2sm ml-7'>Expected delivery date</span> */}
						<span className="text-2sm ml-7">
							{businessProfile.shippingOndemandTime}
						</span>
						<CalendarMonthOutlinedIcon fontSize="small" className="mr-3" />
					</Box>
				</Box>
			</Box>

			<button
				className={styles.bigBtn}
				onClick={handleContinue}
				disabled={disable}
			>
				continue
			</button>
		</Box>
	);
}

export default DeliveryOption;
