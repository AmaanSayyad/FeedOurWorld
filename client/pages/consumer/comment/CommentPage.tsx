import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
	Navbar,
	CommentCardComponent,
	WriteCommentCardComponent,
} from '../../../components/marketplace';
import { getReviewForFarm, getMe } from '../../../components/marketplace/API';
import { useRouter } from 'next/router';
import { fetchToken } from '../../../components/marketplace/token';

function CommentPage() {
	const router = useRouter();
	const data = router.query;
	const [reviews, setReviews] = useState<any>([{}]);
	const [photo, setPhoto] = useState('');
	const [name, setName] = useState('');
	const [load, setLoad] = useState(false);

	const fetch = async () => {
		try {
			const token = fetchToken();
			const res = await getReviewForFarm(token, data.data as string);
			const me = await getMe(token);
			const rating = res.data.data.data;
			const mySelf = me.data.data.data;
			setReviews(rating);
			setPhoto(mySelf?.photo);
			setName(mySelf?.name);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [load]);

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
					<Navbar arrow={true} rating={true} />
				</Box>
				<Box className={styles.upperSubBox}>
					<span className="text-2sm font-bold">{data.ratingsAverage}</span>
					<span className="text-3sm font-semibold ml-2">{`(${data.ratingsQuantity})`}</span>
				</Box>

				<Box className={styles.commentBox}>
					{reviews.map((i: any) => {
						return (
							<CommentCardComponent
								key={i?.id}
								createdAt={i?.createdAt}
								rating={i?.rating}
								review={i?.review}
								userName={i?.user?.name}
								userPhoto={i?.user?.photo}
							/>
						);
					})}
				</Box>

				<Box className={styles.footerBox}>
					<WriteCommentCardComponent
						userPhoto={photo}
						userName={name}
						setLoad={setLoad}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default CommentPage;
