import React from 'react';
import ImageCard from '../Img/ImageCard';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Rating, Stack } from '@mui/material';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			_id: '',
			image: '',
			name: '',
			weight: '',
			ratingsAverage: 0,
			ratingsQuantity: 0,
			price: 0,
		},
	};
};

function ProductCard(props: any) {
	const sendData = {
		data: props._id,
	};

	const styles = {
		card: `w-full max-w-md h-20 flex justify-around text-black`,
		imgBox: `h-20 w-20`,
		productdesc: `flex flex-col justify-center items-start`,
	};
	return (
		<Box className={styles.card}>
			<Box className={styles.imgBox}>
				<ImageCard image={props.image} type="products" />
			</Box>
			<Box className={styles.productdesc}>
				<span className="font-bold text-2sm">{props.name}</span>
				<span className="font-bold text-sm">{props.weight}</span>
				<span className="font-bold text-sm flex w-full">
					<Stack spacing={1}>
						<Rating
							name="read-only"
							precision={0.1}
							size="small"
							value={props.ratingsAverage}
						/>
					</Stack>
				</span>
				<Box className="flex justify-center items-center w-10">
					<span className="text-2sm ml-3 mr-2">({props.ratingsQuantity})</span>
					<PeopleIcon fontSize="small" />
				</Box>
				<span className="font-bold text-sm">${props.price}</span>
			</Box>
			<Box className="flex justify-center items-center"></Box>
		</Box>
	);
}

export default ProductCard;
