import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Rating, Stack } from '@mui/material';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			userName: '',
			rating: 0,
			title: '',
			createdAt: '',
			review: '',
		},
	};
};

function CommentCard(props: any) {
	const styles = {
		card: `mb-5`,
	};

	return (
		<Box className={styles.card}>
			<div className="">
				<AccountCircleIcon color="primary" />
				<span className="font-bold text-2sm ml-2">{props?.userName}</span>
			</div>
			<div className="">
				<Stack spacing={1}>
					<Rating
						name="read-only"
						precision={0.1}
						size="small"
						value={props?.rating}
					/>
				</Stack>
			</div>
			<span className="font-bold ">{props?.title}</span>
			<div className="mt-1">
				<p className="font-semibold text-2sm">{`Reviewed on ${props?.createdAt}`}</p>
				<p className="text-sm">{props?.review}</p>
			</div>
		</Box>
	);
}

export default CommentCard;
