import React, { useState } from 'react';
import { Box } from '@mui/material';
import DebitCard from './DebitCard';
import CryptoCard from './CryptoCard';
import { GetStaticProps } from 'next';

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

function ChoosePaymentOptionCard(props: any) {
	const [upi, setUpi] = useState(false);
	const [debit, setDebit] = useState(false);
	const [crypto, setCrypto] = useState(true);

	const handleATM = async () => {
		try {
			props.setConfirm({
				address: true,
				payment: true,
				debitCard: false,
				order: false,
				value: 2,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSetPayment = (type: string) => {
		if (type === 'upi') {
			setUpi(true);
			setDebit(false);
			setCrypto(false);
		} else if (type === 'debit') {
			setUpi(false);
			setDebit(true);
			setCrypto(false);
		} else if (type === 'crypto') {
			setUpi(false);
			setDebit(false);
			setCrypto(true);
		}
	};

	const styles = {
		card: `w-screen flex flex-col justify-around items-center max-w-md`,
		btn: `border-1 rounded-3xl w-32 h-8 text-2sm font-bold mb-3 focus:bg-dark-gray focus:text-white disabled:text-light-gray`,
	};
	return (
		<Box className={styles.card}>
			<Box className="w-full flex justify-center items-center">
				<span className="text-2sm font-normal">Payment</span>
			</Box>
			<Box className="w-full flex flex-col justify-between items-center mt-2">
				<button
					className={styles.btn}
					onClick={() => handleSetPayment('upi')}
					disabled
				>{`UPI / Netbanking`}</button>
				<button
					className={styles.btn}
					onClick={() => handleSetPayment('debit')}
					disabled
				>{`Debit / ATM card`}</button>
				<button
					className={styles.btn}
					onClick={() => handleSetPayment('crypto')}
					autoFocus
				>{`Crypto(CUSD)`}</button>
			</Box>

			<Box className="w-11/12 mt-5">
				{crypto ? (
					<CryptoCard
						setConfirm={props.setConfirm}
						setWalletAddress={props.setWalletAddress}
						setShowTerms={props.setShowTerms}
						setShowWallet={props.setShowWallet}
					/>
				) : (
					<DebitCard setConfirm={props.setConfirm} />
				)}
			</Box>
		</Box>
	);
}

export default ChoosePaymentOptionCard;
