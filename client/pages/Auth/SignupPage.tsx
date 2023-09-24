import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignupFormInterface } from '../../interface/AllFarmsInterface';
import { signupMethod } from '../../components/marketplace/API';
import {
	Alert,
	AlertColor,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Snackbar,
	Backdrop,
	CircularProgress,
	Box,
	TextField,
} from '@mui/material';
import {
	createMyConsumerProfile,
	createMyBusinessProfile,
} from '../../components/marketplace/API';

function SignupPage() {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [accType, setAccType] = useState('');
	const [alertTxt, setAlertTxt] = useState('');
	const [alertStatus, setAlertStatus] = useState<AlertColor>(
		'success' || 'warning' || 'info' || 'error'
	);
	const [open, setOpen] = useState(false);
	const [openBacldrop, setOpenBackdrop] = useState(false);

	const handleChange = (event: SelectChangeEvent) => {
		setAccType(event.target.value as string);
		setSignupForm({ ...signupForm, role: event.target.value as string });
	};

	const [signupForm, setSignupForm] = useState<SignupFormInterface>({
		role: '',
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});
	const expireTime = process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME || 0;

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
			const signup = await signupMethod({
				role: signupForm.role,
				name: signupForm.name,
				email: signupForm.email,
				password: signupForm.password,
				passwordConfirm: signupForm.passwordConfirm,
			});

			const token = signup.data.token;
			const expire = new Date().getTime() + Number(expireTime);
			localStorage.setItem(
				'Token',
				JSON.stringify({ value: `${token}`, expires: expire })
			);
			if (signupForm.role === 'user') {
				await createMyConsumerProfile(token);
			} else if (signupForm.role === 'business') {
				await createMyBusinessProfile(token);
			}
			signupForm.name = '';
			signupForm.email = '';
			signupForm.password = '';
			signupForm.passwordConfirm = '';
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
		small_box: `w-11/12 mt-3 flex justify-between items-center`,
	};

	return (
		<Box className={styles.full_page}>
			<Box className={styles.container}>
				<Box className={styles.top_container}>
					<Box className={styles.big_txt_box}>
						<span className={styles.big_txt}>Hello!</span>
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
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Account Type</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={accType}
							label="Account Type"
							onChange={handleChange}
						>
							<MenuItem value={'user'}>Consumer</MenuItem>
							<MenuItem value={'business'}>Producer</MenuItem>
						</Select>
					</FormControl>

					<TextField
						margin="normal"
						required
						fullWidth
						id="text"
						label={accType === 'business' ? 'Farm Name' : 'User Name'}
						name="name"
						autoComplete="name"
						autoFocus
						value={signupForm.name}
						onChange={handleInputChange}
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={signupForm.email}
						onChange={handleInputChange}
					/>
					<TextField
						margin="normal"
						error={
							signupForm.password.length > 0 && signupForm.password.length < 8
						}
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={signupForm.password}
						onChange={handleInputChange}
					/>
					<TextField
						margin="normal"
						error={
							signupForm.passwordConfirm.length > 0 &&
							signupForm.password !== signupForm.passwordConfirm
						}
						required
						fullWidth
						name="passwordConfirm"
						label="Confirm Password"
						type="password"
						id="ConfirmPassword"
						autoComplete="current-password"
						value={signupForm.passwordConfirm}
						onChange={handleInputChange}
					/>

					<Box className={styles.btn_box}>
						<button className={styles.btn} onClick={handleClick}>
							<span className="text-3sm font-semibold">Sign Up</span>
						</button>
					</Box>
					<Box className={styles.small_box}>
						<span className="text-3sm font-semibold">{`I Already Have an Account`}</span>
						<Link href={'/Auth/LoginPage'}>
							<span className="text-3sm font-bold">{`Log In`}</span>
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

export default SignupPage;
