import React, { useState, useEffect } from 'react';
import {
	getAllBusiness,
	getAllStockProduct,
	getAllOndemandProduct,
} from '../../components/marketplace/API';
import {
	Navbar,
	BottomNav,
	AllFarmsCard,
	FilterNav,
	SearchBar,
	AllProducts,
} from '../../components/marketplace';
import { Box } from '@mui/material';

function AllFarms() {
	const [allFarms, setAllFarms] = useState([{}]);
	const [allStockProducts, setAllStockProducts] = useState([{}]);
	const [allOndemandProducts, setAllOndemandProducts] = useState([{}]);
	const [loading, setLoading] = useState(true);
	const [showFarm, setShowFarm] = useState(true);

	let array = [1, 2, 3, 4, 5];

	const fetchAllFarms = async () => {
		try {
			const x = await getAllBusiness();
			const res: any = await getAllStockProduct();
			const res2: any = await getAllOndemandProduct();
			const data = x.data.data.data;
			const stockProductData = res.data.data.data;
			const ondemandData = res2.data.data.data;
			setAllFarms(data);
			setAllStockProducts(stockProductData);
			setAllOndemandProducts(ondemandData);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAllFarms();
	}, []);

	const styles = {
		page: `w-screen flex flex-col justify-around items-center max-w-md`,
		navBox: `w-full px-4 z-50`,
		navBox2: `w-full z-50 top-0 mt-20 bg-white fixed`,
		navBox3: `w-full z-50 top-0 bg-white fixed`,
		scrollingBox: `w-full flex flex-col justify-around items-center max-w-md relative z-0 mt-44`,
	};

	return (
		<div className={styles.page}>
			<Box className={styles.navBox}>
				<Navbar arrow={false} />
			</Box>
			<Box className={styles.navBox2}>
				<FilterNav setShowFarm={setShowFarm} />
			</Box>
			<Box className={styles.navBox3} sx={{ marginTop: '124px' }}>
				<SearchBar />
			</Box>
			<Box className={styles.scrollingBox}>
				{showFarm ? (
					<AllFarmsCard
						allFarms={allFarms}
						setAllFarms={setAllFarms}
						loading={loading}
						setLoading={setLoading}
						array={array}
					/>
				) : (
					<AllProducts
						allStockProducts={allStockProducts}
						setAllStockProducts={setAllStockProducts}
						allOndemandProducts={allOndemandProducts}
						setAllOndemandProducts={setAllOndemandProducts}
						loading={loading}
						setLoading={setLoading}
						array={array}
					/>
				)}
			</Box>
			<Box className="w-full mt-10">
				<BottomNav />
			</Box>
		</div>
	);
}

export default AllFarms;

function showSlides(): () => void {
	throw new Error('Function not implemented.');
}
