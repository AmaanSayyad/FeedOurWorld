import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	Navbar,
	ImageCard,
	BottomNav,
	ProductCardComponent,
	ProductFilterNav,
} from '../../components/marketplace';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import {
	getSingleBusiness,
	getMyFavouriteFarms,
	addFavourite,
	removeFavourite,
	getMyCart,
	distance,
} from '../../components/marketplace/API';
import { RouterQueryInterface } from '../../interface/AllFarmsInterface';
import { fetchToken } from '../../components/marketplace/token';
import { Skeleton, Box, Checkbox } from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

function FarmPage() {
	const router = useRouter();
	const id = router.query as RouterQueryInterface;
	let array = [1, 2];
	const [farmDetails, setFarmDetails] = useState<any>({});
	const [showStockProduct, setShowStockProduct] = useState<boolean>(false);
	const [Token, setToken] = useState<string>('');
	const [cartItems, setCartItems] = useState([]);
	const [reloadComponent, setReloadComponent] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [favourite, setFavourite] = useState<boolean>(false);
	const [farmDistance, setFarmDistance] = useState(0);

	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

	const fetch = async () => {
		try {
			const token = fetchToken();
			setToken(token);
			const singleBusiness = await getSingleBusiness(id.data, token);
			const favFarm = await getMyFavouriteFarms(token);
			const data = singleBusiness?.data?.data?.data;
			const favouriteFarmData = favFarm?.data?.data?.data;
			const dis = await distance(token, data.id, 'mi');
			if (dis) {
				setFarmDistance(dis.data.data.data);
			}
			favouriteFarmData?.farms.map((i: any) => {
				if (i.businessAccount._id === id.data) {
					setFavourite(true);
				}
			});
			const response = await getMyCart(token);
			if (response.data.data.data.length > 0) {
				const cartData = response.data.data.data[0].items;
				setCartItems(cartData);
			}
			setShowStockProduct(true);
			setFarmDetails(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFavourite = async () => {
		setFavourite((prev) => !prev);
		let res;
		try {
			if (favourite) {
				res = await removeFavourite(Token, id.data as string);
			} else {
				res = await addFavourite(Token, id.data as string);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id.data]);

	const styles = {
		page: `w-screen flex flex-col justify-between items-center`,
		container: `w-screen flex flex-col justify-around items-center max-w-md`,
		navBox: `w-full px-4 z-50`,
		top_container: `w-11/12 h-60 mt-28 border-1 border-light-gray max-w-md rounded-3xl flex flex-col justify-around items-center`,
		productsBox: `w-full mt-10 mb-10 flex flex-col justify-center items-center`,
		top_sub_container: `w-10/12 h-48 flex flex-col justify-around items-center`,
		top_sub_box: `border-b-1 border-light-gray w-11/12 h-10 flex justify-between items-center`,
		commentBox: `w-full flex flex-col justify-centar items-center mt-3`,
		bottomBox: `w-full flex justify-center items-center mt-10`,
		statBox: `h-10 flex flex-col justify-between items-center`,
		farm_name_txt: `text-2sm font-bold w-full flex justify-center items-center`,
		img_box: `w-20 h-20 rounded-full bg-white mb-10 absolute`,
		low_container: `w-full h-16 flex justify-around items-center`,
	};

	return (
		<Box className={styles.page}>
			<Box className={styles.container}>
				<Box className={styles.navBox}>
					<Navbar arrow={true} farm={true} load={reloadComponent} />
				</Box>
				<Box className={styles.top_container}>
					<Box className={styles.top_sub_container}>
						<Box className={styles.top_sub_box}>
							<Checkbox
								{...label}
								icon={<FavoriteBorder />}
								checkedIcon={<Favorite sx={{ color: '#ff6d75' }} />}
								checked={favourite}
								onClick={handleFavourite}
							/>
							<MonetizationOnOutlinedIcon />
						</Box>
						<Box className={styles.img_box}>
							{farmDetails?.user?.photo ? (
								<ImageCard image={farmDetails?.user?.photo} rounded={true} />
							) : (
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Skeleton variant="circular" width={70} height={70} />
								</Box>
							)}
						</Box>
						<span className={styles.farm_name_txt}>
							{farmDetails?.user?.name}
						</span>
					</Box>
					<Box className={styles.low_container}>
						<Box className={styles.statBox}>
							<Link
								href={{
									pathname: '/consumer/comment/CommentPage',
									query: {
										data: farmDetails.id,
										ratingsAverage: farmDetails.ratingsAverage,
										ratingsQuantity: farmDetails.ratingsQuantity,
									},
								}}
							>
								<StarBorderRoundedIcon />
							</Link>
							<span className="text-sm font-semibold">
								{farmDetails.ratingsAverage}
							</span>
						</Box>
						<Box className={styles.statBox}>
							<LocalShippingOutlinedIcon />
							<span className="text-sm font-semibold">
								{farmDetails.shippingTimeStandard}
							</span>
						</Box>
						<Box className={styles.statBox}>
							<LocationOnOutlinedIcon />
							<span className="text-sm font-semibold">
								{farmDistance ? `${Math.round(farmDistance)} mi` : '100 mi'}{' '}
							</span>
						</Box>
					</Box>
				</Box>
				<Box className="w-full mt-2">
					<ProductFilterNav setShowStockProduct={setShowStockProduct} />
				</Box>
				<Box className="w-10/12 mt-3 justify-start items-center">
					<span className="font-semibold text-3sm textdark-gray">
						{farmDetails.allProduct && farmDetails.allProduct.length} products
					</span>
				</Box>

				<Box className={styles.productsBox}>
					{loading
						? array.map((i) => {
								return (
									<Stack className="w-11/12 flex p-2" key={i}>
										<Box className="w-full flex justify-between">
											<Skeleton
												animation="wave"
												variant="rectangular"
												width="30%"
												height={80}
												className="rounded-md"
											/>
											<Skeleton
												animation="wave"
												variant="rectangular"
												width="65%"
												height={80}
												className="rounded-md"
											/>
										</Box>
										<Skeleton animation="wave" />
									</Stack>
								);
						  })
						: showStockProduct
						? farmDetails.stockProducts.map((product: any, index: any) => {
								const sendData = {
									data: product._id,
									type: 'stock',
								};
								return (
									<Box className="w-11/12" key={product._id}>
										<Link
											key={product._id}
											href={{
												pathname: '/consumer/ProductPage',
												query: sendData,
											}}
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
									</Box>
								);
						  })
						: farmDetails.ondemandProducts.map((product: any, index: any) => {
								const sendData = {
									data: product._id,
									type: 'ondemand',
								};
								return (
									<Box className="w-11/12" key={product._id}>
										<Link
											key={product._id}
											href={{
												pathname: '/consumer/ProductPage',
												query: sendData,
											}}
										>
											<ProductCardComponent
												key={product._id}
												type={'ondemand'}
												name={product.name}
												unit={product.unit}
												capacity={product.capacity}
												price={product.price}
												images={product.image}
											/>
										</Link>
									</Box>
								);
						  })}
				</Box>
			</Box>
			<Box className={styles.bottomBox}>
				<BottomNav />
			</Box>
		</Box>
	);
}

export default FarmPage;
