import {
	Alert,
	AlertColor,
	Box,
	Button,
	IconButton,
	Snackbar,
	Backdrop,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar, BottomNav } from '../../components/marketplace';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { StockProduct } from '../../interface/AllFarmsInterface';
import { fetchToken } from '../../components/marketplace/token';
import {
	getSingleStockProduct,
	updateMyStockProduct,
	createMyStockProduct,
	deleteStockProduct,
} from '../../components/marketplace/API';
import Image from 'next/image';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const AddStockProduct = () => {
	const router = useRouter();
	const data = router.query;

	const [productDetails, setProductDetails] = useState<StockProduct>({
		product: '',
		name: '',
		batch: '',
		image: '',
		stock: 0,
		unit: 'lb',
		price: 0,
		organic: 'no',
		id: '',
		freshRemain: 0,
	});
	const [previewUrl, setPreviewUrl] = useState('');
	const [image, setImage] = useState(false);
	const [alertTxt, setAlertTxt] = useState('');
	const [alertStatus, setAlertStatus] = useState<AlertColor>('success');
	const [open, setOpen] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [openBackdrop, setOpenBackdrop] = useState(false);

	const handleAddUpdate = async () => {
		setOpenBackdrop(true);
		try {
			const token = fetchToken();
			const id = data.id as string;
			const formData = new FormData();

			// Append form data with product details
			formData.append('image', productDetails?.image);
			formData.append('product', productDetails.product);
			formData.append('name', productDetails.name);
			formData.append('batch', productDetails.batch);
			formData.append('stock', productDetails.stock as unknown as Blob);
			formData.append('unit', productDetails.unit);
			formData.append('price', productDetails.price as unknown as Blob);
			formData.append(
				'freshRemain',
				productDetails.freshRemain as unknown as Blob
			);
			formData.append('organic', productDetails.organic);

			const res = await updateMyStockProduct(token, id, formData);

			setOpen(true);
			setAlertStatus('success');
			setAlertTxt('Successfully updated the details!!!');
			setTimeout(function () {
				history.back();
			}, 2000);
		} catch (error: any) {
			console.log(error);
			setOpen(true);
			setAlertStatus('error');
			setAlertTxt(`${error.response.data.message}`);

			setTimeout(function () {
				window.location.reload();
			}, 2000);
		}
	};

	const handleClickOpen = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleDeleteProduct = async () => {
		setOpenDialog(false);
		setOpenBackdrop(true);
		try {
			const token = fetchToken();
			console.log(productDetails.id);
			const res = await deleteStockProduct(token, productDetails.id);
			console.log(res);
			window.location.replace(`/`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddPost = async () => {
		setOpenBackdrop(true);
		try {
			const token = fetchToken();
			const formData = new FormData();

			// Append form data with product details
			formData.append('image', productDetails?.image);
			formData.append('product', productDetails.product);
			formData.append('name', productDetails.name);
			formData.append('batch', productDetails.batch);
			formData.append('stock', productDetails.stock as unknown as Blob);
			formData.append('unit', productDetails.unit);
			formData.append('price', productDetails.price as unknown as Blob);
			formData.append(
				'freshRemain',
				productDetails.freshRemain as unknown as Blob
			);
			formData.append('organic', productDetails.organic);

			const res = await createMyStockProduct(token, formData);

			setOpen(true);
			setAlertStatus('success');
			setAlertTxt('Successfully add the product!!!');
			setTimeout(function () {
				history.back();
			}, 2000);
		} catch (error: any) {
			console.log(error);
			setOpen(true);
			setAlertStatus('error');
			setAlertTxt(`${error.response.data.message}`);

			setTimeout(function () {
				window.location.replace(`/Auth/ProducerProfile`);
			}, 2000);
		}
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleImgChange = (e: any) => {
		try {
			setImage(true);
			const selectedFile = e.target.files?.[0];

			if (selectedFile) {
				setProductDetails({ ...productDetails, image: selectedFile });
				const reader: any = new FileReader();
				reader.readAsDataURL(selectedFile);
				reader.onloadend = () => {
					setPreviewUrl(reader.result);
				};
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchProductData = async () => {
		try {
			const token = fetchToken();
			const id = data.id as string;
			const unit = data.unit as string;
			const res = await getSingleStockProduct(id, token, unit);
			const product = res.data.data.data;
			setProductDetails(product);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (data.data === 'patch') {
			fetchProductData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const styles = {
		page: `w-screen flex flex-col justify-around items-center max-w-md`,
		navBox: `w-full px-4 z-50`,
		container: `w-11/12 mt-16 flex flex-col justify-center items-center mb-10`,
		subContainer: `w-full flex flex-col justify-center items-center mt-5`,
		verticalSubContainer: `w-11/12 flex justify-between items-center mt-5`,
		smallSubBox: `w-5/12 flex flex-col justify-start items-center`,
		topOption: `w-32 h-8 rounded-2xl bg-light-gray flex justify-center items-center mt-2`,
		txtBox: `w-11/12 flex justify-start items-center`,
		imgBox: `w-11/12 mt-1 flex justify-between items-center`,
		boldTxt: `text-2sm font-bold`,
		inputBox: `w-11/12 border-1 border-light-gray rounded-xl h-8 mt-1 flex justify-end items-center`,
		sminputBox: `w-full border-1 border-light-gray rounded-xl h-8 mt-1 flex justify-end items-center`,
		input: `w-full h-full rounded-xl px-3 text-2sm font-semibold`,
		button: `w-11/12 rounded-2xl bg-green flex justify-center items-center text-2sm font-semibold h-8 mt-10`,
		bottomBox: `w-full flex justify-center items-center mt-10`,
	};

	return (
		<Box className={styles.page}>
			<Box className={styles.navBox}>
				<Navbar arrow={true} addProductInStock={true} noCart={true} />
			</Box>
			<Box className={styles.container}>
				<Box className={styles.subContainer}>
					<span className="text-2sm font-semibold">Status</span>
					<Box className={styles.topOption}>
						<span className="text-2sm font-bold text-dark-gray">{`1. in stock`}</span>
					</Box>
				</Box>
				{data.data === 'patch' && (
					<Box className="w-full flex justify-end items-center">
						<DeleteOutlineOutlinedIcon
							fontSize="medium"
							color="error"
							onClick={() => setOpenDialog(true)}
						/>
					</Box>
				)}
				<Dialog
					open={openDialog}
					onClose={handleCloseDialog}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'WARNING!!!'}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure, do you want to delete this product??
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleDeleteProduct}
							className="font-bold capitalize"
						>
							Yes
						</Button>
						<Button
							onClick={handleCloseDialog}
							autoFocus
							className="font-bold capitalize"
						>
							No
						</Button>
					</DialogActions>
				</Dialog>

				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={openBackdrop}
					onClick={() => setOpenBackdrop(false)}
				>
					<CircularProgress color="inherit" />
				</Backdrop>

				<Box className={styles.subContainer}>
					<Box className={styles.txtBox}>
						<span className={styles.boldTxt}>Product - Food groups</span>
					</Box>
					<Box className={styles.inputBox}>
						<input
							type="text"
							className={styles.input}
							value={productDetails.product}
							onChange={(e: any) =>
								setProductDetails({
									...productDetails,
									product: e.target.value,
								})
							}
						/>
					</Box>
				</Box>

				<Box className={styles.subContainer}>
					<Box className={styles.txtBox}>
						<span className={styles.boldTxt}>Product name</span>
					</Box>
					<Box className={styles.inputBox}>
						<input
							type="text"
							className={styles.input}
							value={productDetails.name}
							onChange={(e: any) =>
								setProductDetails({ ...productDetails, name: e.target.value })
							}
						/>
					</Box>
				</Box>

				<Box className={styles.subContainer}>
					<Box className={styles.txtBox}>
						<span className={styles.boldTxt}>Batch</span>
					</Box>
					<Box className={styles.inputBox}>
						<input
							type="text"
							className={styles.input}
							value={productDetails.batch}
							onChange={(e: any) =>
								setProductDetails({ ...productDetails, batch: e.target.value })
							}
						/>
					</Box>
				</Box>

				<Box className={styles.subContainer}>
					<Box className={styles.txtBox}>
						<span className={styles.boldTxt}>Image</span>
					</Box>
					<Box className={styles.imgBox}>
						<Box className="border-1 border-light-gray rounded-xl w-20 h-20">
							<Image
								alt="#"
								src={image ? previewUrl : productDetails.image}
								width={100}
								height={100}
								className="w-full h-full"
							/>
						</Box>
						<IconButton
							className="text-black"
							aria-label="upload picture"
							component="label"
						>
							<input
								hidden
								accept="image/*"
								type="file"
								onChange={handleImgChange}
							/>
							<CameraAltOutlinedIcon className="mr-2" />
						</IconButton>
					</Box>
				</Box>

				<Box className={styles.verticalSubContainer}>
					<Box className={styles.smallSubBox}>
						<Box className={styles.txtBox}>
							<span className={styles.boldTxt}>Stock</span>
						</Box>
						<Box className={styles.sminputBox}>
							<input
								type="number"
								className={styles.input}
								value={productDetails.stock}
								onChange={(e: any) =>
									setProductDetails({
										...productDetails,
										stock: e.target.value,
									})
								}
							/>
						</Box>
					</Box>
					<Box className={styles.smallSubBox}>
						<Box className={styles.txtBox}>
							<span className={styles.boldTxt}>Unit</span>
						</Box>
						<Box className={styles.sminputBox}>
							<select
								name="unit"
								className={styles.input}
								value={productDetails.unit}
								onChange={(e: any) =>
									setProductDetails({ ...productDetails, unit: e.target.value })
								}
							>
								<option value={'lb'}>lb</option>
								<option value={'kg'}>kg</option>
								<option value={'oz'}>gm</option>
							</select>
						</Box>
					</Box>
				</Box>

				<Box className={styles.subContainer}>
					<Box className={styles.txtBox}>
						<span className={styles.boldTxt}>{`Price $ / unit`}</span>
					</Box>
					<Box className={styles.inputBox}>
						<input
							type="number"
							className={styles.input}
							value={productDetails.price}
							onChange={(e: any) =>
								setProductDetails({ ...productDetails, price: e.target.value })
							}
						/>
					</Box>
				</Box>

				<Box className={styles.verticalSubContainer}>
					<Box className={styles.smallSubBox}>
						<Box className={styles.txtBox}>
							<span className={styles.boldTxt}>Organic</span>
						</Box>
						<Box className={styles.sminputBox}>
							<select
								name="organic"
								className={styles.input}
								value={productDetails.organic}
								onChange={(e: any) =>
									setProductDetails({
										...productDetails,
										organic: e.target.value,
									})
								}
							>
								<option value={'yes'}>yes</option>
								<option value={'no'}>no</option>
							</select>
						</Box>
					</Box>
					<Box className={styles.smallSubBox}>
						<Box className={styles.txtBox}>
							<span className={styles.boldTxt}>{`Expire till(days)`}</span>
						</Box>
						<Box className={styles.sminputBox}>
							<input
								type="number"
								className={styles.input}
								value={productDetails.freshRemain}
								onChange={(e: any) =>
									setProductDetails({
										...productDetails,
										freshRemain: e.target.value,
									})
								}
							/>
						</Box>
					</Box>
				</Box>
				<button
					className={styles.button}
					onClick={data.data === 'patch' ? handleAddUpdate : handleAddPost}
				>
					{data.data === 'patch' ? 'Update' : 'Add'}
				</button>
			</Box>

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

			<Box className={styles.bottomBox}>
				<BottomNav produce={true} />
			</Box>
		</Box>
	);
};

export default AddStockProduct;
