import {
	Alert,
	AlertColor,
	Avatar,
	Box,
	Container,
	IconButton,
	Paper,
	Snackbar,
	TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchToken } from '../../components/marketplace/token';
import {
	getMyBusinessProfile,
	updateMe,
	updateMyWalletAddress,
} from '../../components/marketplace/API';
import { PhotoCamera } from '@mui/icons-material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { BottomNav, LocationCard } from '../../components/marketplace';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { DetailsComponent } from '../../components/business';
import { Chip, Backdrop, CircularProgress } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount } from 'wagmi';
import Link from 'next/link';

interface User {
	name: string;
	email: string;
	photo?: File | null;
}

function ProducerProfile() {
	const [userEdit, setUserEdit] = useState(false);
	const [locationEdit, setLocationEdit] = useState(false);
	const [img, setImg] = useState(false);
	const [userDetails, setUserDetails] = useState<User>({
		name: '',
		email: '',
		photo: null,
	});
	const [previewUrl, setPreviewUrl] = useState('');
	const [myProfile, setMyProfile] = useState<any>({});
	const [alertTxt, setAlertTxt] = useState('');
	const [alertStatus, setAlertStatus] = useState<AlertColor>(
		'success' || 'warning' || 'info' || 'error'
	);
	const [openModal, setOpen] = useState(false);
	const [walletEdit, setWalletEdit] = useState(false);
	const [walletAddress, setWalletAddress] = useState<any>(
		'0x00000000000000000000000000000000000000000'
	);
	const [openBackdrop, setOpenBackdrop] = useState(false);
	const { address, isConnecting, isDisconnected, isConnected } = useAccount();

	const fetch = async () => {
		setOpenBackdrop(true);
		try {
			const token = fetchToken();
			const res = await getMyBusinessProfile(token);
			const data = res.data.data.data[0];
			setMyProfile(data);
			setUserDetails({
				name: data.user.name,
				email: data.user.email,
				photo: data.user.photo,
			});
			setOpenBackdrop(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleImgChange = (e: any) => {
		try {
			setImg(true);
			const selectedFile = e.target.files?.[0];
			if (selectedFile) {
				setUserDetails({ ...userDetails, photo: selectedFile });
				const reader: any = new FileReader();
				reader.readAsDataURL(selectedFile);
				reader.onloadend = () => {
					setPreviewUrl(reader.result);
				};
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleConnect = async () => {
		try {
			setWalletAddress(address);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateWalletAddress = async () => {
		try {
			setWalletAddress(address);
			const token = fetchToken();
			const res = await updateMyWalletAddress(token, {
				walletAddress: address as string,
			});
			setWalletEdit(false);
			fetch();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignOut = async () => {
		try {
			localStorage.setItem('Token', JSON.stringify({ value: '', expires: 0 }));
			window.location.replace(`/`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		try {
			setUserEdit(true);
			const token = fetchToken();
			const formData = new FormData();
			if (userDetails.photo) {
				formData.append('photo', userDetails.photo);
			}
			formData.append('name', userDetails.name);
			formData.append('email', userDetails.email);
			const res = await updateMe(token, formData);
			setOpen(true);
			setAlertStatus('success');
			setAlertTxt('Successfully updated your profile!!!');
			window.location.reload();
		} catch (error: any) {
			console.log(error);
			setOpen(true);
			setAlertStatus('error');
			setAlertTxt(`${error.response.data.message}`);
			window.location.reload();
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	const styles = {
		main: `w-screen flex flex-col justify-center items-center`,
		page: `flex flex-col justify-between items-center mb-10`,
		navBox: `w-screen h-20 flex justify-between items-center bg-white`,
		profileText: `font-bold text-3sm`,
		signOut: `w-20 h-8 rounded-xl bg-dark-blue text-2sm font-semibold mr-3 text-white`,
		bottomBox: `w-full flex justify-center items-center mt-10`,
		profileContainer: `border-1 border-light-gray w-full min-h-24 rounded-2xl flex justify-around items-center`,
		subProfileContainer: `w-3/12 h-full flex justify-center items-center`,
		infoContainer: `border-1 border-light-gray w-full rounded-2xl flex justify-around items-center mt-5 flex flex-col justify-around items-center`,
		mapContainer: `border-1 border-light-gray w-full h-52 rounded-2xl flex justify-center items-center mt-5`,
		recordContainer: `border-1 border-light-gray w-full h-48 rounded-2xl flex flex-col justify-center items-center mt-5`,
		infoBox: `border-1 border-light-gray h-14 rounded-2xl w-11/12 flex justify-center items-center mt-2 mb-2`,
		subInfoBox: `w-11/12 flex justify-between items-center`,
		walletBtn: `border-1 w-full rounded-2xl border-light-gray mt-5 flex flex-col justify-around items-center mb-5`,
		accountBox: `w-8/12 h-full flex flex-col justify-center items-center`,
		producerTxt: `text-sm text-light-gray mb-auto mt-3`,
	};

	return (
		<Box className={styles.main}>
			<Container className={styles.page} maxWidth="sm">
				<Paper className={styles.navBox} elevation={0}>
					<Box className="ml-3">
						<MenuIcon />
					</Box>
					<span className={styles.profileText}>Profile</span>
					<button className={styles.signOut} onClick={handleSignOut}>
						Sign out
					</button>
				</Paper>

				<Box className={styles.profileContainer}>
					<Box className={styles.subProfileContainer}>
						<Avatar
							alt={myProfile?.user?.name}
							src={img ? previewUrl : myProfile?.user?.photo}
							sx={{ width: 56, height: 56 }}
							className="animate__animated animate__rubberBand"
						/>
						{userEdit ? (
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="label"
								className="absolute mt-9 ml-12"
							>
								<input
									hidden
									accept="image/*"
									type="file"
									onChange={handleImgChange}
								/>
								<PhotoCamera />
							</IconButton>
						) : (
							<Box></Box>
						)}
					</Box>

					<Backdrop
						sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
						open={openBackdrop}
						onClick={() => setOpenBackdrop(false)}
					>
						<CircularProgress color="inherit" />
					</Backdrop>

					<Box className={styles.accountBox}>
						{!userEdit ? (
							<span className={styles.producerTxt}>Account type: Producer</span>
						) : (
							<span></span>
						)}
						<Box className="w-full flex flex-col justify-center items-center mt-4">
							{userEdit ? (
								<Box
									className="w-full flex justify-end items-end mt-1 mr-1"
									onClick={() => setUserEdit(false)}
								>
									<ClearIcon fontSize="small" />
								</Box>
							) : (
								<Box></Box>
							)}
							{userEdit ? (
								<TextField
									id="standard-basic"
									label={myProfile?.user?.name}
									variant="standard"
									onChange={(e: any) =>
										setUserDetails({ ...userDetails, name: e.target.value })
									}
								/>
							) : (
								<span className="text-sm font-bold">
									{myProfile?.user?.name}
								</span>
							)}
							{userEdit ? (
								<Box className="w-full">
									<span className="text-2sm font-semibold">Email:</span>
									<span className="text-2sm font-semibold overflow-hidden ml-2">
										{`${myProfile?.user?.email}`.slice(0, 35)}
									</span>
								</Box>
							) : (
								<span className="text-sm font-semibold overflow-hidden">
									{`${myProfile?.user?.email}`.slice(0, 35)}
								</span>
							)}
						</Box>
						<Box className="w-full flex justify-end">
							{userEdit ? (
								<AddCircleOutlineOutlinedIcon
									fontSize="small"
									onClick={handleUpdate}
									className="mt-3"
								/>
							) : (
								<ModeEditOutlineOutlinedIcon
									fontSize="small"
									onClick={() => setUserEdit(true)}
								/>
							)}
						</Box>
					</Box>
				</Box>

				<Box className={styles.mapContainer}>
					{locationEdit ? (
						<Box className="w-full h-full flex flex-col justify-center items-center">
							<Box className="w-full flex justify-end items-start mb-auto mt-2 mr-4">
								<ClearIcon
									fontSize="small"
									onClick={() => {
										setLocationEdit(false);
									}}
								/>
							</Box>
							<span></span>
							<Link
								href={'/producer/location/ShowMap'}
								className="w-52 h-9 flex justify-center items-center bg-green rounded-2xl mb-10"
							>
								<span className="text-3sm text-white font-semibold">
									Add location
								</span>
							</Link>
						</Box>
					) : myProfile?.location?.coordinates?.length === 2 ? (
						<Box className="w-full h-full flex flex-col rounded-2xl">
							<LocationCard
								lat={myProfile?.location?.coordinates[1]}
								lng={myProfile?.location?.coordinates[0]}
							/>
							<Box
								className="flex justify-end items-end absolute"
								sx={{ marginLeft: '260px', marginTop: '5px' }}
							>
								<ModeEditOutlineOutlinedIcon
									fontSize="small"
									onClick={() => setLocationEdit(true)}
								/>
							</Box>
						</Box>
					) : (
						<Box className="w-full h-full flex flex-col justify-center items-center">
							<Box></Box>
							<span className="text-2sm font-semibold mr-auto ml-7">
								My Address
							</span>
							<Box className="w-full h-44 flex justify-end items-end">
								{!myProfile?.location && (
									<Chip
										color="warning"
										label="Add Location"
										size="small"
										className="mr-auto"
										icon={<WarningAmberOutlinedIcon />}
									/>
								)}
								<ModeEditOutlineOutlinedIcon
									fontSize="small"
									onClick={() => setLocationEdit(true)}
								/>
							</Box>
						</Box>
					)}
				</Box>

				<Box className={styles.infoContainer}>
					<DetailsComponent
						shippingRadius={myProfile?.shippingRadius as number}
						shippingCostStandard={myProfile?.shippingCostStandard as number}
						shippingTimeStandard={myProfile?.shippingTimeStandard as string}
						shippingCostExpress={myProfile?.shippingCostExpress as number}
						shippingTimeExpress={myProfile?.shippingTimeExpress as string}
						shippingOndemandCost={myProfile?.shippingOndemandCost as number}
						shippingOndemandTime={myProfile?.shippingOndemandTime as string}
					/>
				</Box>

				<Box className={styles.recordContainer}>
					<Box className="w-10/12 flex justify-start items-center">
						<span className="text-2sm font-bold">Record</span>
					</Box>
					<Box className={styles.infoBox}>
						<Box className={styles.subInfoBox}>
							<span className="text-2sm">Orders received</span>
							<span className="text-2sm">{myProfile?.orderReceived}</span>
							<Link href="/producer/order/AllMyOrders">
								<ArrowForwardIosIcon className="text-black" />
							</Link>
						</Box>
					</Box>
					<Box className={styles.infoBox}>
						<Box className={styles.subInfoBox}>
							<span className="text-2sm">Rating</span>
							<Box className="flex justify-center items-center">
								<span className="text-2sm">{myProfile?.ratingsAverage}</span>
								<StarBorderIcon fontSize="small" className="ml-2" />
							</Box>
							<Link
								href={{
									pathname: `/producer/comment/AllMyComments`,
									query: {
										id: myProfile._id,
										ratingsAverage: myProfile?.ratingsAverage,
										ratingsQuantity: myProfile?.ratingsQuantity,
									},
								}}
							>
								<ArrowForwardIosIcon className="text-black" />
							</Link>
						</Box>
					</Box>
				</Box>

				<Box className={styles.walletBtn}>
					{walletEdit ? (
						<Box className="w-full flex flex-col justify-center items-center">
							<Box className="w-full flex justify-end items-end mt-1">
								<ClearIcon
									fontSize="small"
									onClick={() => setWalletEdit(false)}
								/>
							</Box>
							<Box className="w-11/12 flex justify-between items-center">
								<AccountBalanceWalletOutlinedIcon />
								<span className="text-2sm font-semibold">
									{walletAddress?.slice(0, 7)}.......
									{walletAddress?.slice(35, 42)}
								</span>
							</Box>

							<Box onClick={handleConnect} className="mt-3">
								<ConnectButton />
							</Box>
						</Box>
					) : (
						<Box className="w-11/12 flex justify-between items-center mt-2">
							<AccountBalanceWalletOutlinedIcon />
							<span className="text-2sm font-semibold">
								{myProfile?.walletAddress?.slice(0, 7)}.......
								{myProfile?.walletAddress?.slice(35, 42)}
							</span>
						</Box>
					)}
					<Box className="w-full flex flex-col justify-center items-center mt-5">
						<Box className="w-full flex justify-end items-end">
							{!myProfile?.walletAddress && (
								<Chip
									color="warning"
									label="Add Wallet Address"
									size="small"
									className="mr-auto"
									icon={<WarningAmberOutlinedIcon />}
								/>
							)}
							{!walletEdit ? (
								<ModeEditOutlineOutlinedIcon
									fontSize="small"
									onClick={() => setWalletEdit(true)}
								/>
							) : (
								<AddCircleOutlineOutlinedIcon
									fontSize="small"
									onClick={handleUpdateWalletAddress}
								/>
							)}
						</Box>
					</Box>
				</Box>

				<Snackbar open={openModal} autoHideDuration={4500} className="w-full">
					<Alert
						variant="filled"
						onClose={handleClose}
						severity={alertStatus}
						className="w-11/12"
					>
						{alertTxt}
					</Alert>
				</Snackbar>
			</Container>

			<Box className={styles.bottomBox}>
				<BottomNav
					produce={true}
					warning={
						typeof myProfile?.location === 'undefined' ||
						typeof myProfile?.walletAddress === 'undefined'
					}
				/>
			</Box>
		</Box>
	);
}

export default ProducerProfile;
