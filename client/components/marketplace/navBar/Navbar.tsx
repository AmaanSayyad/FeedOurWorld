import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMyCart } from '../API';
import { fetchToken } from '../token';
import { Box, BadgeProps, styled, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			trigger: false,
			load: false,
			arrow: false,
			farm: false,
			produce: false,
			addProductInStock: false,
			addProductOndemand: false,
			product: false,
			order: false,
			myOrder: false,
			orderDetails: false,
			rating: false,
			noCart: false,
		},
	};
};

function Navbar(props: any) {
	const [totalAmount, setTotalAmount] = useState(0);

	const fetch = async () => {
		try {
			let Token = fetchToken();
			// const response = await getMyCart(Token)
			let response: any;
			if (Token) {
				response = await getMyCart(Token);
			} else if (typeof Token === 'undefined') {
				return;
			}
			if (response?.data?.data.data.length > 0) {
				const cartData = response?.data.data.data[0];

				setTotalAmount(cartData.items.length);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
		'& .MuiBadge-badge': {
			right: -3,
			top: 13,
			border: `2px solid red`,
			backgroundColor: 'red',
			padding: '0 4px',
		},
	}));

	useEffect(() => {
		fetch();
	}, [props.load]);

	const styles = {
		fullPage: `w-screen flex flex-col justify-between items-center fixed top-0 left-0`,
		upperNav: `flex w-full h-20 justify-around items-center bg-white max-w-screen-sm`,
		triggerUpperNav: `flex w-full h-20 justify-around items-center bg-white max-w-screen-sm bg-transparent`,
		bar: `flex justify-between items-center w-full h-3/6`,
		searchBar: `flex justify-around items-center w-7/12 h-4/6 bg-white rounded-md p-2`,
		input: `w-11/12 h-full flex justify-center items-center focus:outline-none placeholder:text-2sm p-2 rounded-md`,
		imgCover: `h-10 w-10 rounded-full`,
		linkStyle: `flex flex-col justify-center items-center h-20 w-20 text-black no-underline`,
		headTxt: `text-3sm font-bold`,
		cartless: `w-full flex justify-center items-center mr-8`,
	};
	return (
		<Box className="w-full justify-center items-center">
			<Box className={styles.fullPage}>
				<Box
					className={props.trigger ? styles.triggerUpperNav : styles.upperNav}
				>
					<Box className={styles.bar}>
						<Box className="ml-5">
							{props.arrow ? (
								<KeyboardBackspaceOutlinedIcon
									fontSize="large"
									onClick={() => history.back()}
								/>
							) : (
								<MenuIcon />
							)}
						</Box>

						{props.farm ? (
							<span className={styles.headTxt}>Farm</span>
						) : props.produce ? (
							<Box className={styles.cartless}>
								<span className={styles.headTxt}>Produce</span>
							</Box>
						) : props.addProductInStock ? (
							<Box className={styles.cartless}>
								<span className={styles.headTxt}>Add Product in stock</span>
							</Box>
						) : props.addProductOndemand ? (
							<Box className={styles.cartless}>
								<span className={styles.headTxt}>Add Product On demand</span>
							</Box>
						) : props.myFavourite ? (
							<Box className={styles.cartless}>
								<span className={styles.headTxt}>Favourite Farms</span>
							</Box>
						) : props.product ? (
							<span className={styles.headTxt}>Product</span>
						) : props.order ? (
							<span className={styles.headTxt}>Order</span>
						) : props.myOrder ? (
							<Box className={styles.cartless}>
								<span className={styles.headTxt}>My orders</span>
							</Box>
						) : props.orderDetails ? (
							<Box className={styles.cartless}>
								<span className={styles.headTxt}>
									{props?.ids && props.ids.slice(16, 24)}
								</span>
							</Box>
						) : props.rating ? (
							<Box className={styles.cartless}>
								<span className={styles.headTxt}>Rating</span>
							</Box>
						) : (
							<span className={styles.headTxt}>Discover</span>
						)}
						{!props.noCart && (
							<Box className="mr-3">
								<Link href={'/consumer/CartPage'} className="mr-2">
									<IconButton aria-label="cart">
										<StyledBadge
											badgeContent={totalAmount}
											sx={{ color: 'white' }}
										>
											<ShoppingCartOutlinedIcon sx={{ color: 'black' }} />
										</StyledBadge>
									</IconButton>
								</Link>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default Navbar;
