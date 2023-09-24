import React, { useState, useEffect } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import Link from 'next/link';
import { fetchToken } from '../token';
import { GetStaticProps } from 'next';
import { Badge, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			produce: false,
			warning: false,
		},
	};
};

function BottomNav(props: any) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [url, setUrl] = useState('');

	const fetch = async () => {
		try {
			const token = fetchToken();
			if (token) {
				setLoggedIn(true);
			}
			setUrl(window.location.pathname);
		} catch (error) {
			console.log(error);
		}
	};

	const StyledBadge = styled(Badge)(({ theme }) => ({
		'& .MuiBadge-badge': {
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: 'ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	}));

	useEffect(() => {
		fetch();
	}, []);

	const styles = {
		focus: `flex justify-center items-center`,
		focus2: `flex justify-center items-center border-1 w-full h-full rounded-3xl focus:bg-green active:bg-green`,
		box: `flex flex-col justify-center items-center h-12 w-20 rounded-3xl focus:bg-green active:bg-green`,
		Urlbox: `flex flex-col justify-center items-center h-12 w-20 rounded-3xl bg-green `,
		txt: `text-2sm font-semibold`,
	};

	return (
		<Box className="w-full fixed bottom-0 max-w-md flex justify-around items-center min-h-20 bg-light-white">
			<Link href={'/'} className={url === '/' ? styles.Urlbox : styles.box}>
				<Box className={styles.focus}>
					{!props.produce ? (
						<ShoppingBagOutlinedIcon fontSize="medium" />
					) : (
						<LocalOfferOutlinedIcon fontSize="medium" />
					)}
				</Box>
				<span className={styles.txt}>Consume</span>
			</Link>

			<button className={styles.box}>
				{loggedIn && props.produce ? (
					<Link
						href={'/Auth/ProducerProfile'}
						className={
							url === '/Auth/ProducerProfile' ? styles.Urlbox : styles.focus2
						}
					>
						<Box className="w-full h-full rounded-3xl flex flex-col justify-center items-center">
							{props?.warning ? (
								<StyledBadge
									color="warning"
									overlap="circular"
									variant="dot"
									badgeContent=" "
								>
									<PermIdentityIcon fontSize="medium" />
								</StyledBadge>
							) : (
								<PermIdentityIcon fontSize="medium" />
							)}
							<span className={styles.txt}>Profile</span>
						</Box>
					</Link>
				) : loggedIn && !props.produce ? (
					<Link
						href={'/Auth/UserProfile'}
						className={
							url === '/Auth/UserProfile' ? styles.Urlbox : styles.focus2
						}
					>
						<Box className="w-full h-full rounded-3xl flex flex-col justify-center items-center">
							<PermIdentityIcon fontSize="medium" />
							<span className={styles.txt}>Profile</span>
						</Box>
					</Link>
				) : (
					<Link href={'/Auth/LoginPage'} className={styles.focus2}>
						<Box className="w-full h-full rounded-3xl flex flex-col justify-center items-center">
							<PermIdentityIcon fontSize="medium" />
							<span className={styles.txt}>Login</span>
						</Box>
					</Link>
				)}
			</button>
		</Box>
	);
}

export default BottomNav;
