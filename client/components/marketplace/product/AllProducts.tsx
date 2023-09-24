import { Box, Skeleton, Typography, Alert, Snackbar } from '@mui/material';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ProductCardComponent from './ProductCardComponent';
import { fetchToken } from '../token';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			loading: null,
			array: null,
			allStockProducts: [],
			allOndemandProducts: [],
		},
	};
};

function AllProducts(props: any) {
	const [open, setOpen] = useState(false);
	const [tokenExists, setTokenExists] = useState(false);

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const fetch = async () => {
		try {
			const token = fetchToken();
			if (token) {
				setTokenExists(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	const styles = {
		page: `w-screen flex flex-col justify-around items-center max-w-md`,
		navBox: `w-full px-4 z-50`,
		bannerBox: `w-full h-full border-1 w-11/12 h-44 rounded-xl drop-shadow-lg bg-white flex justify-center items-center`,
		catagorieBox: `w-full h-20 flex items-center`,
		top5: `rounded-xl bg-white ml-5 w-full h-70`,
		catagorieSubImg: `w-16 h-16 ml-3 rounded-lg bg-white drop-shadow-lg active:drop-shadow-0.5lg`,
		filterBox: `border-2 w-full h-20 mb-2 flex justify-start items-center`,
		scrollingBox: `w-full flex flex-col justify-around items-center max-w-md relative z-0 mt-44`,
		allproducts: `w-full flex flex-col justify-center items-center`,
		productCardBox: `w-full flex justify-center items-center relative z-0 mt-5 mb-10 p-0`,
		filter: `w-20 h-20 rounded-full border-2`,
	};

	return (
		<Box className="w-full p-0">
			<Box className={styles.productCardBox}>
				<Box className={styles.allproducts}>
					<Snackbar
						open={open}
						autoHideDuration={4000}
						className="w-full fixed mb-10"
					>
						<Alert
							variant="filled"
							onClose={handleClose}
							severity={'warning'}
							className="w-11/12"
						>
							{`Please login to get access`}
						</Alert>
					</Snackbar>
					{props.loading ? (
						props.array.map((i: any) => {
							return (
								<Box
									className="w-11/12 h-24 rounded-xl flex justify-between items-center mb-5 border-1 border-light-gray"
									key={i}
								>
									<Skeleton
										animation="wave"
										variant="circular"
										width={50}
										height={50}
									/>
									<Box className="w-8/12 h-full flex flex-col ml-3">
										<Skeleton animation="wave" width="70%">
											<Typography>-</Typography>
										</Skeleton>
										<Skeleton animation="wave" width="30%">
											<Typography>-</Typography>
										</Skeleton>
										<Skeleton animation="wave" width="30%">
											<Typography>-</Typography>
										</Skeleton>
										<Skeleton animation="wave" width="70%">
											<Typography>-</Typography>
										</Skeleton>
									</Box>
									<Box className="h-full w-16 flex justify-center items-center">
										<Skeleton animation="wave" width={50} height={50} />
									</Box>
								</Box>
							);
						})
					) : (
						<Box className="w-11/12">
							{tokenExists ? (
								<Box className="w-full">
									<Box className="w-full">
										{props.allStockProducts.map((product: any) => {
											const sendData1 = {
												data: product._id,
												type: 'stock',
											};
											return (
												<Link
													href={{
														pathname: '/consumer/ProductPage',
														query: sendData1,
													}}
													className="text-black no-underline w-full cursor-pointer"
													key={product._id}
												>
													<ProductCardComponent
														key={product._id}
														type={'stock'}
														name={product.name}
														stock={product.stock}
														unit={product.unit}
														price={product.price}
														images={product.image}
													/>
												</Link>
											);
										})}
									</Box>
									<Box className="w-full">
										{props.allOndemandProducts.map((product: any) => {
											const sendData1 = {
												data: product._id,
												type: 'ondemand',
											};
											return (
												<Link
													href={{
														pathname: '/consumer/ProductPage',
														query: sendData1,
													}}
													className="text-black no-underline w-full cursor-pointer"
													key={product._id}
												>
													<ProductCardComponent
														key={product._id}
														type={'ondemand'}
														name={product.name}
														capacity={product.capacity}
														unit={product.unit}
														price={product.price}
														images={product.image}
													/>
												</Link>
											);
										})}
									</Box>
								</Box>
							) : (
								<Box className="w-full">
									<Box className="w-full">
										{props.allStockProducts.map((product: any) => {
											return (
												<Box
													className="text-black no-underline w-full cursor-pointer"
													key={product._id}
													onClick={() => setOpen(true)}
												>
													<ProductCardComponent
														key={product._id}
														type={'stock'}
														name={product.name}
														stock={product.stock}
														unit={product.unit}
														price={product.price}
														images={product.image}
													/>
												</Box>
											);
										})}
									</Box>
									<Box className="w-full">
										{props.allOndemandProducts.map((product: any) => {
											return (
												<Box
													className="text-black no-underline w-full cursor-pointer"
													key={product._id}
													onClick={() => setOpen(true)}
												>
													<ProductCardComponent
														key={product._id}
														type={'ondemand'}
														name={product.name}
														capacity={product.capacity}
														unit={product.unit}
														price={product.price}
														images={product.image}
													/>
												</Box>
											);
										})}
									</Box>
								</Box>
							)}
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
}

export default AllProducts;
