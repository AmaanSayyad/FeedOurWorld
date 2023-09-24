import { Box } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			id: '',
			createdAt: '',
		},
	};
};

function OrderCardComponentBusiness(props: any) {
	const styles = {
		card: `border-1 w-full rounded-2xl h-8 flex justify-around items-center mb-2`,
	};

	return (
		<Box className={styles.card}>
			<span className="text-2sm font-semibold">{props.id.slice(16, 24)}</span>
			<span className="text-2sm font-semibold">
				{props.createdAt.slice(0, 10)}
			</span>
			<Link
				href={{
					pathname: `/producer/order/OrderDetailsBusinessPage`,
					query: { id: props.id },
				}}
			>
				<ArrowForwardIosIcon />
			</Link>
		</Box>
	);
}

export default OrderCardComponentBusiness;
