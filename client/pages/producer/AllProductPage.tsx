import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
	Navbar,
	SearchBar,
	BottomNav,
	ProductCardComponent,
} from '../../components/marketplace';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ProductFilterNav from '../../components/marketplace/navBar/ProductFilterNav';
import {
	getMyStockProducts,
	getMyOndemandProduct,
	getMyBusinessProfile,
} from '../../components/marketplace/API';
import { fetchToken } from '../../components/marketplace/token';
import { Box, Skeleton, Typography } from '@mui/material';

const AllProductPage = () => {
	const [stockProduct, setStockProduct] = useState(true);
	const [myProducts, setMyProducts] = useState<any>([]);
	const [myProfile, setMyProfile] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = async () => {
		try {
			const token = fetchToken();
			const resProfile = await getMyBusinessProfile(token);
			const resStock = await getMyStockProducts(token);
			const resOndemand = await getMyOndemandProduct(token);

			const profileData = resProfile.data.data.data[0];
			const stockProductsData = resStock.data.data.data;
			const ondemandProductsData = resOndemand.data.data.data;

			setMyProfile(profileData);
			setMyProducts(stockProduct ? stockProductsData : ondemandProductsData);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stockProduct]);

	const styles = {
		page: `w-screen flex flex-col justify-around items-center max-w-md`,
		navBox: `w-full px-4 z-50`,
		navBox2: `w-full z-50 top-0 mt-20 bg-white fixed`,
		navBox3: `w-full z-50 top-0 bg-white fixed`,
		navBox4: `w-10/12 z-50 top-0 bg-white fixed flex justify-between items-center`,
		scrollingBox: `w-full flex flex-col justify-around items-center max-w-md relative z-0 mt-56`,
	};

	return (
		<Box className={styles.page}>
			<Box className={styles.navBox}>
				<Navbar arrow={false} produce={true} noCart={true} />
			</Box>
			<Box className={styles.navBox2}>
				<ProductFilterNav produce={true} setStockProduct={setStockProduct} />
			</Box>
			<Box className={styles.navBox3} sx={{ marginTop: '124px' }}>
				<SearchBar />
			</Box>
			<Box className={styles.navBox4} sx={{ marginTop: '180px' }}>
				<span className="text-2sm">{myProducts.length} products</span>
				<Link
					href={{
						pathname: stockProduct
							? `/producer/AddStockProduct`
							: `/producer/AddOndemandProduct`,
						query: { data: 'post' },
					}}
					className="text-black"
				>
					<AddCircleOutlineOutlinedIcon fontSize="small" />
				</Link>
			</Box>

			<Box className={styles.scrollingBox}>
				{loading
					? [1, 2, 3, 4, 5].map((i: number) => (
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
					  ))
					: myProducts.map((product: any) => (
							<Box
								className="text-black no-underline w-11/12 cursor-pointer"
								key={product._id}
							>
								<ProductCardComponent
									key={product._id}
									id={product._id}
									stockProduct={stockProduct}
									name={product.name}
									stock={product.stock}
									unit={product.unit}
									price={product.price}
									images={product.image}
									producer={true}
									capacity={product.capacity}
								/>
							</Box>
					  ))}
			</Box>

			<Box className="w-full mt-10">
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
};

export default AllProductPage;
