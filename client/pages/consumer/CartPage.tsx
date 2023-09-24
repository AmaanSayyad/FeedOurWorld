import React, { useState, useEffect } from 'react';
import { Navbar, CartProductCardComponent } from '../../components/marketplace';
import Image from 'next/image';
import { getMyCart } from '../../components/marketplace/API';
import { fetchToken } from '../../components/marketplace/token';
import { Box, Backdrop, CircularProgress } from '@mui/material';
import Link from 'next/link';

function CartPage() {
	const [empty, setEmpty] = useState(true);
	const [sendData, setSendData] = useState({});
	const [cartItems, setCartItems] = useState([]);
	const [subTotal, setSubTotal] = useState(0);
	const [reloadComponent, setReloadComponent] = useState(false);
	const [totalItems, setTotalItems] = useState(0);
	const [openBackdrop, setOpenBackdrop] = useState(false);

	const handleReload = () => {
		setReloadComponent((prevState) => !prevState);
	};

	const fetch = async () => {
		setOpenBackdrop(true);
		try {
			const Token = fetchToken();
			const response = await getMyCart(Token);
			const data = response.data.data.data[0];
			setSubTotal(data.subTotal);
			setTotalItems(data.items.length);
			setCartItems(data.items);
			if (data.items[0].ondemandProduct) {
				setSendData({ ondemand: data.items[0].ondemandProduct.id });
			} else if (data.items[0].stockProduct) {
				setSendData({ stock: data.items[0].stockProduct.id });
			}
			if (data.items.length > 0) {
				setEmpty(false);
			} else {
				setEmpty(true);
			}
			setOpenBackdrop(false);
		} catch (error) {
			console.log(error);
			setOpenBackdrop(false);
		}
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reloadComponent]);

	const styles = {
		main: `w-screen min-h-screen flex flex-col justify-between items-center`,
		page: `w-screen flex flex-col justify-center items-center max-w-md`,
		navBox: `w-full px-4 z-50`,
		totalBox: `mt-36 flex pt-5 pb-5 pl-3 w-11/12`,
		btnBox: `w-full flex justify-center items-center mt-20`,
		cartProductBox: `flex flex-col justify-center items-center w-screen max-w-md mb-10`,
		bottomBox: `w-11/12 max-w-md flex justify-around items-center h-16`,
		btn: `w-5/12 h-8 rounded-3xl border-1 border-black text-black text-2sm font-semibold`,
		btn2: `w-5/12 h-8 rounded-3xl text-2sm font-semibold bg-green text-black`,
	};

	return (
		<Box className={styles.main}>
			<Box className={styles.page}>
				<Box className={styles.navBox}>
					<Navbar load={handleReload} order={true} arrow={true} />
				</Box>
				{empty ? (
					<Box className="mt-44 flex flex-col justify-center items-center">
						<Image
							alt="#"
							src={`/images/emptycart.png`}
							width={200}
							height={200}
							className="w-full h-full"
						/>
						<span className="font-semibold text-lg">Oops...</span>
						<span className="font-semibold text-lg">
							Your FOW Cart is empty
						</span>
						<span className="font-semibold text-2sm">
							Pick up where you left off
						</span>
					</Box>
				) : (
					<>
						<Box className="w-full flex justify-center items-center mt-24">
							<span className="text-2sm font-semibold mr-1">{totalItems}</span>
							{totalItems > 1 ? (
								<span className="text-2sm font-semibold">Products</span>
							) : (
								<span className="text-2sm font-semibold">Product</span>
							)}
						</Box>
						<Box className={styles.cartProductBox}>
							{cartItems.map((item: any) => {
								return (
									<Box
										className="w-full h-full flex flex-col justify-center items-center mt-5"
										key={item._id}
									>
										<CartProductCardComponent
											key={item._id}
											id={item?.ondemandProduct?.id || item?.stockProduct?.id}
											price={
												item?.ondemandProduct?.price ||
												item?.stockProduct?.price
											}
											orderTotal={item?.orderTotal}
											name={
												item?.ondemandProduct?.name || item?.stockProduct?.name
											}
											unit={item.orderUnit}
											quantity={item.orderQuantity}
											image={
												item?.ondemandProduct?.image ||
												item?.stockProduct?.image
											}
											loadFunc={handleReload}
										/>
									</Box>
								);
							})}
							<Box className="w-7/12 h-10 mt-10 flex justify-end items-center">
								<span className="text-2sm font-bold mr-5">Total</span>
								<span
									className="text-2sm font-bold ml-5"
									onClick={() => fetch()}
								>
									$ {Number(subTotal).toFixed(3)}
								</span>
							</Box>
						</Box>
					</>
				)}
			</Box>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={openBackdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box className={styles.bottomBox}>
				<button className={styles.btn}>
					<Link href={'/'}>Add Product</Link>
				</button>
				<button className={styles.btn2}>
					<Link
						href={{
							pathname: '/consumer/DeliverySteps',
							query: sendData,
						}}
					>
						Checkout
					</Link>
				</button>
			</Box>
		</Box>
	);
}

export default CartPage;
