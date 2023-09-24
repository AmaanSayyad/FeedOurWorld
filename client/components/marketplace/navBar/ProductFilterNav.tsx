import { Box } from '@mui/material';
import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			setShowStockProduct: null,
			setStockProduct: null,
			produce: false,
		},
	};
};

function ProductFilterNav(props: any) {
	const [focusStock, setFocusStock] = useState(false);
	const [focusOndemand, setFocusOndemand] = useState(false);

	const handleStock = () => {
		try {
			props.setShowStockProduct(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleStockProduce = () => {
		try {
			props.setStockProduct(true);
			setFocusStock(true);
			setFocusOndemand(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleOndemand = () => {
		try {
			props.setShowStockProduct(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleOndemandProduce = () => {
		try {
			props.setStockProduct(false);
			setFocusStock(false);
			setFocusOndemand(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setFocusStock(true);
	}, []);

	const styles = {
		lowerNav: `flex w-full h-11 justify-around items-center bg-white max-w-screen-sm p-2`,
		btn: `w-5/12 h-8 rounded-3xl border-2 border-dark-gray text-dark-gray text-2sm font-semibold`,
		focusBtn: `w-5/12 h-8 rounded-3xl border-2 border-dark-gray text-2sm font-semibold bg-dark-gray text-white`,
	};
	return (
		<Box className={styles.lowerNav}>
			<button
				className={focusStock ? styles.focusBtn : styles.btn}
				autoFocus={true}
				onClick={props.produce ? handleStockProduce : handleStock}
			>
				Stock
			</button>
			<button
				className={focusOndemand ? styles.focusBtn : styles.btn}
				onClick={props.produce ? handleOndemandProduce : handleOndemand}
			>
				On demand
			</button>
		</Box>
	);
}

export default ProductFilterNav;
