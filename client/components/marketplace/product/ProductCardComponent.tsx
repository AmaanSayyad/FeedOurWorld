import React from 'react';
import ImageCard from '../Img/ImageCard';
import { Box, Paper } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Link from 'next/link';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			images: '',
			name: '',
			stock: 0,
			capacity: 0,
			unit: '',
			id: '',
		},
	};
};

function ProductCardComponent(props: any) {
	const styles = {
		wholeCard: `w-full h-24 bg-white rounded-2xl flex justify-between items-center mb-5 drop-shadow-lg border-1 border-light-gray`,
		imgBox: `w-full h-24 rounded-xl border-1`,
		infoBox: `flex flex-col p-2`,
		bigText: `text-sm indent-0 font-semibold`,
		smallText: `text-xs`,
	};

	return (
		<Paper elevation={0} className={styles.wholeCard}>
			<Box className="h-full w-3/12 flex justify-center items-center">
				<Box className="w-14 h-14 rounded-full">
					<ImageCard image={props.images} />
				</Box>
			</Box>

			<Box className="w-8/12 h-20 flex justify-between items-center">
				<Box className="w-10/12 h-full flex flex-col justify-around items-start">
					<span className="text-2.5sm font-semibold">{props.name}</span>
					<span className="text-2.5sm font-semibold">
						{props.stock || props.capacity} {props.unit}{' '}
						{props.capacity && `/month`}
					</span>
					<span className="text-2sm font-bold">
						$ {props.price} / {props.unit}
					</span>
				</Box>
				{props.producer ? (
					<Box className="w-2/12 h-full flex justify-center items-center">
						{props.stockProduct ? (
							<Link
								href={{
									pathname: `/producer/AddStockProduct`,
									query: { data: 'patch', id: props.id, unit: props.unit },
								}}
							>
								<ModeEditOutlinedIcon />
							</Link>
						) : (
							<Link
								href={{
									pathname: `/producer/AddOndemandProduct`,
									query: { data: 'patch', id: props.id, unit: props.unit },
								}}
							>
								<ModeEditOutlinedIcon />
							</Link>
						)}
					</Box>
				) : (
					<Box className="w-2/12 h-full flex justify-center items-center">
						<ArrowForwardIosIcon />
					</Box>
				)}
			</Box>
		</Paper>
	);
}

export default ProductCardComponent;
