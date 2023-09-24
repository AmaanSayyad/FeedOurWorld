import React, { ChangeEvent, useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoginFormInterface } from '../../interface/AllFarmsInterface';
import { loginMethod } from '../../components/marketplace/API';
import {
	Alert,
	AlertColor,
	Snackbar,
	TextField,
	Box,
	Backdrop,
	CircularProgress,
} from '@mui/material';
import { forgotPassword } from '../../components/marketplace/API';

function LoginPage() {
	const [signupForm, setSignupForm] = useState<LoginFormInterface>({
		email: '',
		password: '',
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
			const login = await loginMethod({
				email: signupForm.email,
				password: signupForm.password,
			});
			const token = login.data.token;
			const expire = new Date().getTime() + Number(expireTime);
			localStorage.setItem(
				'Token',
				JSON.stringify({ value: `${token}`, expires: expire })
			);
			setOpen(true);
			setAlertStatus('success');
			setAlertTxt('Successfully signed in');
			window.location.replace('/');
		} catch (error: any) {
			console.log(error);
			setOpen(true);
			setAlertStatus('error');
			setAlertTxt(`${error.response.data.message}`);
			setOpenBackdrop(false);
		}
	};

	const handleForgotPassword = async () => {
		try {
			if (signupForm.email === '') {
				setOpen(true);
				setAlertStatus('warning');
				setAlertTxt('Please enter your email address!!!');
				return;
			}

			await forgotPassword(signupForm.email);
			setOpen(true);
			setAlertStatus('info');
			setAlertTxt('An email is sent to your mail box!!!');
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setSignupForm((prev) => ({
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
						<span className={styles.big_txt}>Welcome</span>
						<span className={styles.big_txt}>Back!</span>
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
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={signupForm.email}
						onChange={handleInputChange}
						sx={{
							borderRadius: '10px',
						}}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={signupForm.password}
						onChange={handleInputChange}
						sx={{
							borderRadius: '10px',
						}}
					/>
					<Box className="w-full flex justify-end">
						<span
							className="text-2sm font-semibold cursor-pointer"
							onClick={handleForgotPassword}
						>
							Forgot password?
						</span>
					</Box>
					<Box className={styles.btn_box}>
						<button className={styles.btn} onClick={handleClick}>
							<span className="text-3sm font-semibold">Sign In</span>
						</button>
					</Box>
					<Box className={styles.small_box}>
						<span className="text-3sm font-semibold">{`Don't have an account?`}</span>
						<Link href={'/Auth/SignupPage'}>
							<span className="text-3sm font-bold">{`Sign Up`}</span>
						</Link>
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

export default LoginPage;
