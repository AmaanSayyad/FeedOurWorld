import React, { ChangeEvent, useState, FormEvent } from 'react';
import Image from 'next/image';
import { ResetPasswordInterface } from '../../interface/AllFarmsInterface';
import {
	Alert,
	AlertColor,
	Snackbar,
	TextField,
	Box,
	Backdrop,
	CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

function ResetPassword() {
	const router = useRouter();
	const data = router.query;

	const [resetForm, setresetForm] = useState<ResetPasswordInterface>({
		password: '',
		passwordConfirm: '',
	});
	const [disabled, setDisabled] = useState<boolean>(false);
	const expireTime = process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME || 0;
	const [alertTxt, setAlertTxt] = useState('');
	const [alertStatus, setAlertStatus] = useState<AlertColor>(
		'success' || 'warning' || 'info' || 'error'
	);
	const [open, setOpen] = useState(false);
	const [openBacldrop, setOpenBackdrop] = useState(false);

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		setOpenBackdrop(false);
	};

	const handleClick = async () => {
		setDisabled(true);
		setOpenBackdrop(true);
		try {
			const res = await axios.patch(`${data.URL}`, {
				password: resetForm.password,
				passwordConfirm: resetForm.passwordConfirm,
			});
			setOpen(true);
			setAlertStatus('success');
			setAlertTxt('Successfully reset password!!');
			window.location.replace('/Auth/LoginPage');
		} catch (error: any) {
			console.log(error);
			setOpen(true);
			setAlertStatus('error');
			setAlertTxt(`${error.response.data.message}`);
			setOpenBackdrop(false);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setresetForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const styles = {
		full_page: `w-screen flex flex-col justify-center items-center`,
		container: `w-full h-full flex flex-col justify-center items-center max-w-md`,
		top_container: `w-full flex justify-center items-center`,
		big_txt_box: `absolute flex flex-col mr-10`,
		big_txt: `font-bold text-xl text-white`,
		btn_box: `w-full h-10 mt-5`,
		btn: `w-full h-full rounded-3xl bg-green flex justify-center items-center`,
		small_box: `w-10/12 mt-3 flex justify-between items-center`,
	};

	return (
		<Box className={styles.full_page}>
			<Box className={styles.container}>
				<Box className={styles.top_container}>
					<Box className={styles.big_txt_box}>
						<span className={styles.big_txt}>Reset</span>
						<span className={styles.big_txt}>Password!</span>
					</Box>
					<Image
						alt="background"
						src="/images/bg.png"
						width={500}
						height={250}
					/>
				</Box>
				<Box className={styles.top_container}>
					<Image
						alt="FOW-logo"
						width={100}
						height={100}
						src={'/images/fow.png'}
						className="w-32 h-32"
					/>
				</Box>
				<Box
					sx={{
						width: '85%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '50px',
					}}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="New Password"
						type="password"
						id="password"
						autoComplete="current-password"
						error={
							resetForm.password.length > 0 && resetForm.password.length < 8
						}
						value={resetForm.password}
						onChange={handleInputChange}
						sx={{
							borderRadius: '10px',
						}}
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						name="passwordConfirm"
						label="Confirm Password"
						type="password"
						id="ConfirmPassword"
						autoComplete="current-password"
						error={
							resetForm.passwordConfirm.length > 0 &&
							resetForm.password !== resetForm.passwordConfirm
						}
						value={resetForm.passwordConfirm}
						onChange={handleInputChange}
						sx={{
							borderRadius: '10px',
						}}
					/>

					<Box className={styles.btn_box}>
						<button className={styles.btn} onClick={handleClick}>
							<span className="text-3sm font-semibold">Reset</span>
						</button>
					</Box>
				</Box>

				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={openBacldrop}
				>
					<CircularProgress color="inherit" />
				</Backdrop>

				<Snackbar open={open} autoHideDuration={4500} className="w-full">
					<Alert
						variant="filled"
						onClose={handleClose}
						severity={alertStatus}
						className="w-11/12"
					>
						{alertTxt}
					</Alert>
				</Snackbar>
			</Box>
		</Box>
	);
}

export default ResetPassword;
