import { Box, Typography, styled, Rating, Avatar } from '@mui/material';
import React from 'react';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ImageCard from '../Img/ImageCard';
import { deepOrange } from '@mui/material/colors';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			userPhoto: '',
			userName: '',
			rating: 0,
			createdAt: '',
			review: '',
		},
	};
};

function CommentCardComponent(props: any) {
	const StyledRating = styled(Rating)({
		'& .MuiRating-iconFilled': {
			color: '#000000',
		},
		'& .MuiRating-iconHover': {
			color: '#000000',
		},
	});

	return (
		<Box className="w-full flex justify-center items-center mb-5">
			<Box className="w-11/12 min-h-12 flex justify-around">
				<Box className="h-full w-2/12 flex justify-center items-start">
					<Box className="w-10 h-10 rounded-full">
						{props?.userPhoto ? (
							<ImageCard image={props?.userPhoto} rounded={true} />
						) : (
							<Avatar
								sx={{ bgcolor: deepOrange[500] }}
								alt={props?.userName}
								src="/broken-image.jpg"
							/>
						)}
					</Box>
				</Box>
				<Box className="h-full w-9/12 flex flex-col">
					<Box className="w-full flex justify-start items-center mb-1">
						<span className="text-2sm font-semibold text-dark-gray">
							{props?.userName}
						</span>
					</Box>
					<Box className="w-9/12 h-5 mb-2 flex justify-start items-center">
						<Box className="flex justify-center items-center">
							<StyledRating
								name="simple-controlled"
								value={props?.rating}
								size="small"
								icon={<StarBorderRoundedIcon fontSize="inherit" />}
								readOnly
								precision={0.1}
							/>
						</Box>
						<Box className="flex justify-center items-center ml-5">
							<span className="text-2xs font-semibold text-dark-gray">
								{`(${
									props?.createdAt && (props?.createdAt as string).slice(0, 10)
								})`}
							</span>
						</Box>
					</Box>
					<Box className="w-full">
						<Typography className="text-2sm leading-[1rem] font-medium">
							{props?.review}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default CommentCardComponent;
