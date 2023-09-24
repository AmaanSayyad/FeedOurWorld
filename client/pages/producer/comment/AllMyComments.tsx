import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getReviewForFarm } from '../../../components/marketplace/API';
import { fetchToken } from '../../../components/marketplace/token';
import { useRouter } from 'next/router';
import { Navbar, CommentCardComponent } from '../../../components/marketplace';

const AllMyComments = () => {
	const router = useRouter();
	const [reviews, setReviews] = useState([]);

	const fetchReviews = async () => {
		try {
			const token = fetchToken();
			const reviewData = await getReviewForFarm(
				token,
				router.query.id as string
			);
			const data = reviewData.data.data.data;
			setReviews(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.id]);

	const styles = {
		page: `w-screen flex flex-col justify-center items-center`,
		container: `w-full max-w-md flex flex-col justify-between items-center`,
		navBox: `w-full px-4 z-50`,
		upperBox: `w-full flex flex-col items-center bg-white`,
		upperSubBox: `w-full flex justify-center items-center h-8 mt-24`,
		commentBox: `w-full mb-40 mt-5`,
		footerBox: `w-full max-w-md bg-white fixed bottom-0 h-28 mt-10 flex justify-center items-center z-50`,
	};

	return (
		<Box className={styles.page}>
			<Box className={styles.container}>
				<Box className={styles.navBox}>
					<Navbar arrow rating noCart />
				</Box>
				<Box className={styles.upperSubBox}>
					<span className="text-2sm font-bold">
						{router.query.ratingsAverage}
					</span>
					<span className="text-3sm font-semibold ml-2">
						({router.query.ratingsQuantity})
					</span>
				</Box>

				<Box className={styles.commentBox}>
					{reviews.map((review: any) => (
						<CommentCardComponent
							key={review?.id}
							createdAt={review?.createdAt}
							rating={review?.rating}
							review={review?.review}
							userName={review?.user?.name}
							userPhoto={review?.user?.photo}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default AllMyComments;
