import { Box } from '@mui/material';
import React from 'react';
import 'animate.css';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			setOrderSuccess: null,
			setShowDonation: null,
		},
	};
};

function OrderSuccessCard(props: any) {
	const styles = {
		card: `w-11/12 h-52 fixed mb-52 z-50 bg-white rounded-2xl p-3 flex flex-col justify-center items-center animate__animated animate__zoomIn`,
		btn: `w-40 h-9 rounded-2xl bg-green font-semibold text-2sm mt-5`,
		bigBoldTxt: `text-3sm font-bold`,
	};
	return (
		<Box className={styles.card}>
			<span className={styles.bigBoldTxt}>You order was successful!</span>
			<span className="text-2sm font-semibold mt-5">
				You order number is <span className="text-2sm font-bold">12672719</span>
			</span>

			<span className="text-2sm font-semibold mt-2">{`You’ll receive an email confirming your order`}</span>
			<span className="text-2sm font-semibold">{` details.`}</span>
			<button
				onClick={() => {
					props.setOrderSuccess(false);
					props.setShowDonation(false);
				}}
				className={styles.btn}
			>
				Good
			</button>
		</Box>
	);
}

export default OrderSuccessCard;
