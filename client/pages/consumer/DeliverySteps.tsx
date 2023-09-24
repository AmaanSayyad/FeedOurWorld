import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {
	ConfirmAddressCard,
	ChoosePaymentOptionCard,
	PlaceOrderCard,
	Navbar,
	DeliveryOption,
	Terms,
} from '../../components/marketplace';
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

function DeliverySteps() {
	const [confirm, setConfirm] = useState({
		address: false,
		payment: false,
		debitCard: false,
		order: false,
		value: 0,
	});
	const [showTerms, setShowTerms] = useState(false);
	const [showDonation, setShowDonation] = useState(false);
	const [showWallet, setShowWallet] = useState(false);
	const [standard, setStandard] = useState(false);
	const [express, setExpress] = useState(false);
	const [walletAddress, setWalletAddress] = useState('');

	const styles = {
		page: `w-screen flex flex-col justify-center items-center`,
		triggerPage: `w-screen flex flex-col justify-center items-center bg-blur`,
		container: `w-screen flex flex-col justify-center items-center max-w-md`,
		triggerContainer: `w-screen flex flex-col justify-center items-center max-w-md bg-blur`,
		lowerNav: `w-full h-16 bg-white mt-20 mb-3 flex justify-center items-center`,
		triggerLowerNav: `w-full h-16 bg-white mt-20 mb-3 flex justify-center items-center bg-transparent`,
		navBox: `w-full px-4 z-50`,
		border: `w-10 border-1 border-dashed border-light-gray`,
		bg: `rounded-full w-8 h-8 flex justify-center items-center`,
		activeBg: `rounded-full bg-green w-8 h-8 flex justify-center items-center`,
	};
	return (
		<Box
			className={
				showTerms || showWallet || showDonation
					? styles.triggerPage
					: styles.page
			}
		>
			<Box
				className={
					showTerms || showWallet || showDonation
						? styles.triggerContainer
						: styles.container
				}
			>
				<Box className={styles.navBox}>
					<Navbar
						order={true}
						arrow={true}
						trigger={showTerms || showWallet || showDonation}
					/>
				</Box>
				{showTerms ? (
					<Box></Box>
				) : (
					<Box
						className={
							showTerms || showWallet || showDonation
								? styles.triggerLowerNav
								: styles.lowerNav
						}
					>
						<Box className={styles.activeBg}>
							<WhereToVoteOutlinedIcon fontSize="small" />
						</Box>
						<Box className={styles.border}></Box>
						<Box className={confirm.value > 0 ? styles.activeBg : styles.bg}>
							<LocalShippingOutlinedIcon fontSize="small" />
						</Box>
						<Box className={styles.border}></Box>
						<Box className={confirm.value > 1 ? styles.activeBg : styles.bg}>
							<MonetizationOnOutlinedIcon fontSize="small" />
						</Box>
						<Box className={styles.border}></Box>
						<Box className={confirm.value > 2 ? styles.activeBg : styles.bg}>
							<DescriptionOutlinedIcon fontSize="small" />
						</Box>
					</Box>
				)}

				{showTerms ? (
					<Terms setShowTerms={setShowTerms} />
				) : (
					<Box className="w-full">
						{!confirm.address &&
						!confirm.payment &&
						!confirm.debitCard &&
						!confirm.order ? (
							<ConfirmAddressCard setConfirm={setConfirm} />
						) : confirm.address &&
						  !confirm.payment &&
						  !confirm.debitCard &&
						  !confirm.order ? (
							<DeliveryOption
								setConfirm={setConfirm}
								setStandard={setStandard}
								setExpress={setExpress}
							/>
						) : confirm.address &&
						  confirm.payment &&
						  !confirm.debitCard &&
						  !confirm.order ? (
							// <DebitCard
							//   setConfirm={setConfirm}
							// />
							<ChoosePaymentOptionCard
								setConfirm={setConfirm}
								setWalletAddress={setWalletAddress}
								setShowTerms={setShowTerms}
								setShowWallet={setShowWallet}
							/>
						) : confirm.address &&
						  confirm.payment &&
						  confirm.debitCard &&
						  !confirm.order ? (
							<PlaceOrderCard
								standard={standard}
								express={express}
								walletAddress={walletAddress}
								setShowDonation={setShowDonation}
							/>
						) : (
							<div className=""></div>
						)}
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default DeliverySteps;
