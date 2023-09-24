import { Avatar, Box } from '@mui/material';
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

function FavouriteCardComponent(props: any) {
	const styles = {
		card: `border-1 w-full rounded-2xl h-8 flex justify-around items-center mb-2`,
	};

	return (
		<Box className={styles.card}>
			<Avatar
				alt={props.name}
				src={props.image}
				sx={{ width: 25, height: 25 }}
			/>
			<span className="text-2sm font-semibold">{props.name}</span>
			<Link
				href={{
					pathname: `/consumer/FarmPage`,
					query: { data: props.id },
				}}
			>
				<ArrowForwardIosIcon />
			</Link>
		</Box>
	);
}

export default FavouriteCardComponent;
