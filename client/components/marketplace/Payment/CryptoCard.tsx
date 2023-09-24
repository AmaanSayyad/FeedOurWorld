import React, { useState } from 'react';
import { Box } from '@mui/material';
import { GetStaticProps } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount } from 'wagmi';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			setConfirm: null,
			setWalletAddress: null,
			setShowTerms: null,
			setShowWallet: null,
		},
	};
};

function CryptoCard(props: any) {
	const [connect, setConnect] = useState(false);
	const { address } = useAccount();

	const handleContinue = () => {
		try {
			props.setConfirm({
				address: true,
				payment: true,
				debitCard: true,
				order: false,
				value: 3,
			});
			props.setWalletAddress(address as string);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCheck = async () => {
		props.setShowWallet(false);
		setConnect((prev) => !prev);
	};

	const styles = {
		page: `w-full flex flex-col justify-center items-center`,
		container: `w-full flex flex-col justify-around items-center border-1 h-60 rounded-2xl border-light-gray mb-5`,
		box: `w-11/12 mb-5 flex flex-col border-1 border-light-gray justify-between items-center rounded-xl p-1 px-3`,
		btn1: `bg-dark-blue text-white w-8/12 rounded-3xl h-8 text-2sm font-semibold`,
		btn: `bg-green w-11/12 rounded-3xl h-8 text-2sm font-semibold mb-5 disabled:bg-light-gray`,
	};
	return (
		<Box className={styles.page}>
			<Box className="flex flex-col justify-center items-center">
				<Box className={styles.container}>
					<Box className="w-10/12 flex">
						<span className="text-2sm font-normal">
							<b>Recomended</b> for fast, secure payments with a positive impact
							on the planet.
						</span>
					</Box>

					<Box className="w-full h-11/12 flex justify-center items-center">
						<ConnectButton />
					</Box>
				</Box>
				<Box className="w-9/12 mb-5 flex justify-between items-center">
					<input type="checkbox" name="" id="" onClick={handleCheck} />
					<span className="text-2sm font-semibold">
						I agree to the{' '}
						<span
							className="underline"
							onClick={() => props.setShowTerms(true)}
						>
							terms of the payment
						</span>
					</span>
				</Box>
				<button
					className={styles.btn}
					onClick={handleContinue}
					disabled={!connect}
				>
					Continue
				</button>
			</Box>
		</Box>
	);
}

export default CryptoCard;
