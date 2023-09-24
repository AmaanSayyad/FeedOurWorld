import React from 'react';
import ImageCard from '../Img/ImageCard';
import { Box, Paper } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			images: '',
			name: '',
			ratingsAverage: 0,
			location: null,
		},
	};
};

function FarmCardComponent(props: any) {
	const styles = {
		wholeCard: `w-full h-24 bg-white rounded-2xl flex justify-between items-center mb-5 border-1 drop-shadow-lg border-light-gray`,
		imgBox: `w-full h-24 rounded-xl border-1`,
		infoBox: `flex flex-col p-2`,
		bigText: `text-sm indent-0 font-semibold`,
		smallText: `text-xs`,
	};

	return (
		<Paper elevation={0} className={styles.wholeCard}>
			<Box className="h-full w-3/12 flex justify-center items-center">
				<Box className="w-14 h-14 rounded-full">
					<ImageCard image={props?.images} rounded={true} />
				</Box>
			</Box>

			<Box className="w-8/12 h-20 flex justify-between items-center">
				<Box className="w-10/12 h-full flex flex-col justify-around items-start">
					<span className="text-2sm font-semibold">{props?.name}</span>
					<Box>
						<span className="text-2sm font-semibold">
							{props?.ratingsAverage}
						</span>
						<StarBorderOutlinedIcon fontSize="small" className="ml-2" />
					</Box>
					<span className="text-sm font-bold">
						{props?.location?.description?.slice(0, 20)}
						{props?.location?.description.length > 20 ? '...' : ''}
					</span>
				</Box>
				<Box className="w-2/12 h-full flex justify-center items-center">
					<ArrowForwardIosIcon />
				</Box>
			</Box>
		</Paper>
	);
}

export default FarmCardComponent;
