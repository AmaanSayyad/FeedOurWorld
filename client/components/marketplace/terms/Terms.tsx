import React from 'react';
import { Box } from '@mui/material';
import 'animate.css';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			setShowTerms: null,
		},
	};
};

function Terms(props: any) {
	const styles = {
		container: `rounded-2xl w-11/12 flex flex-col justify-center items-center p-5 mt-20 mb-5 bg-white z-50 animate__animated animate__zoomIn`,
		txt: `text-2sm font-semibold mt-2`,
		btn: `text-2sm font-semibold bg-green rounded-2xl w-32 h-8 mt-5`,
	};

	return (
		<Box className={styles.container}>
			<span className="text-3sm font-bold my-5">Terms of the payment</span>
			<span
				className={styles.txt}
			>{`1. Payment will be processed automatically only after the producer confirms the order. Meanwhile, you can cancel the order if needed.`}</span>
			<span
				className={styles.txt}
			>{`2. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</span>
			<span
				className={styles.txt}
			>{`3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}</span>
			<span
				className={styles.txt}
			>{`4. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</span>
			<span
				className={styles.txt}
			>{`5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}</span>
			<span
				className={styles.txt}
			>{`6. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</span>
			<span
				className={styles.txt}
			>{`7. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</span>
			<button onClick={() => props.setShowTerms(false)} className={styles.btn}>
				Got it
			</button>
		</Box>
	);
}

export default Terms;
