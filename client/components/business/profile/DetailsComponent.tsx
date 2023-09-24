import { Box, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { updateMyBusinessProfileDetails } from '../../marketplace/API';
import { fetchToken } from '../../marketplace/token';
import { BusinessProfileDetailsUpdateInterface } from '../../../interface/AllFarmsInterface';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			shippingCostStandard: 0,
			shippingTimeStandard: '',
			shippingCostExpress: 0,
			shippingTimeExpress: '',
			shippingRadius: 0,
			shippingOndemandTime: '',
			shippingOndemandCost: 0,
		},
	};
};

function DetailsComponent(props: BusinessProfileDetailsUpdateInterface) {
	const [editDetails, setEditDetails] = useState(false);
	const [profileDetails, setProfileDetails] =
		useState<BusinessProfileDetailsUpdateInterface>({
			shippingCostStandard: props.shippingCostStandard,
			shippingTimeStandard: props.shippingTimeStandard,
			shippingCostExpress: props.shippingCostExpress,
			shippingTimeExpress: props.shippingTimeExpress,
			shippingRadius: props.shippingRadius,
			shippingOndemandTime: props.shippingOndemandTime,
			shippingOndemandCost: props.shippingOndemandCost,
		});

	const handleUpdate = async () => {
		try {
			const token = fetchToken();
			const res = await updateMyBusinessProfileDetails(token, profileDetails);
			setEditDetails(false);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const styles = {
		profileText: `font-bold text-3sm ml-auto mr-auto`,
		bottomBox: `w-full flex justify-center items-center mt-10`,
		profileContainer: `border-1 border-light-gray w-full min-h-24 rounded-2xl flex justify-around items-center`,
		infoContainer: `border-1 border-light-gray w-full rounded-2xl flex justify-around items-center mt-5 flex flex-col justify-around items-center`,
		mapContainer: `border-1 border-light-gray w-full h-52 rounded-2xl flex justify-center items-center mt-5`,
		recordContainer: `border-1 border-light-gray w-full h-48 rounded-2xl flex flex-col justify-center items-center mt-5`,
		infoBox: `border-1 border-light-gray h-14 rounded-2xl w-11/12 flex justify-center items-center mt-2 mb-2`,
		subInfoBox: `w-11/12 flex justify-between items-center`,
	};
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			{editDetails && (
				<Box className="w-full flex justify-end items-center">
					<ClearIcon
						fontSize="small"
						onClick={() => setEditDetails(false)}
						sx={{ marginRight: '10px', marginTop: '5px' }}
					/>
				</Box>
			)}
			<Box className={styles.infoBox}>
				<Box className={styles.subInfoBox}>
					<span className="text-2sm">{`Shipping radius(km)`}</span>
					{editDetails ? (
						<TextField
							id="standard-number"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="standard"
							label={props?.shippingRadius}
							sx={{
								width: '100px',
							}}
							onChange={(e: any) =>
								setProfileDetails({
									...profileDetails,
									shippingRadius: Number(e.target.value),
								})
							}
						/>
					) : (
						<span className="text-2sm">{props.shippingRadius} km</span>
					)}
				</Box>
			</Box>
			<Box className="w-10/12 flex justify-start mt-1 mb-1">
				<span className="text-2sm font-semibold">Stock Product</span>
			</Box>
			<Box className={styles.infoBox}>
				<Box className={styles.subInfoBox}>
					<Box className="flex flex-col justify-center items-center">
						<span className="text-2sm">Shipping cost / km</span>
						<span className="text-2sm">{`(Standard Delivery)`}</span>
					</Box>
					{editDetails ? (
						<TextField
							id="standard-number"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="standard"
							label={`$ ${props?.shippingCostStandard}`}
							sx={{
								width: '50px',
							}}
							onChange={(e: any) =>
								setProfileDetails({
									...profileDetails,
									shippingCostStandard: Number(e.target.value),
								})
							}
						/>
					) : (
						<span className="text-2sm">$ {props.shippingCostStandard}</span>
					)}
				</Box>
			</Box>
			<Box className={styles.infoBox}>
				<Box className={styles.subInfoBox}>
					<Box className="flex flex-col justify-center items-center">
						<span className="text-2sm">Shipping time / km</span>
						<span className="text-2sm">{`(Standard Delivery)`}</span>
					</Box>
					{editDetails ? (
						<TextField
							id="standard-number"
							type="string"
							InputLabelProps={{
								shrink: true,
							}}
							variant="standard"
							label={`${props?.shippingTimeStandard}`}
							sx={{
								width: '100px',
							}}
							onChange={(e: any) =>
								setProfileDetails({
									...profileDetails,
									shippingTimeStandard: e.target.value,
								})
							}
						/>
					) : (
						<span className="text-2sm">{props.shippingTimeStandard}</span>
					)}
				</Box>
			</Box>
			<Box className={styles.infoBox}>
				<Box className={styles.subInfoBox}>
					<Box className="flex flex-col justify-center items-center">
						<span className="text-2sm">Shipping cost / km</span>
						<span className="text-2sm">{`(Express Delivery)`}</span>
					</Box>
					{editDetails ? (
						<TextField
							id="standard-number"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="standard"
							label={`$ ${props?.shippingCostExpress}`}
							sx={{
								width: '50px',
							}}
							onChange={(e: any) =>
								setProfileDetails({
									...profileDetails,
									shippingCostExpress: Number(e.target.value),
								})
							}
						/>
					) : (
						<span className="text-2sm">$ {props.shippingCostExpress}</span>
					)}
				</Box>
			</Box>
			<Box className={styles.infoBox}>
				<Box className={styles.subInfoBox}>
					<Box className="flex flex-col justify-center items-center">
						<span className="text-2sm">Shipping time / km</span>
						<span className="text-2sm">{`(Express Delivery)`}</span>
					</Box>
					{editDetails ? (
						<TextField
							id="standard-number"
							type="string"
							InputLabelProps={{
								shrink: true,
							}}
							variant="standard"
							label={`${props?.shippingTimeExpress}`}
							sx={{
								width: '100px',
							}}
							onChange={(e: any) =>
								setProfileDetails({
									...profileDetails,
									shippingTimeExpress: e.target.value,
								})
							}
						/>
					) : (
						<span className="text-2sm">{props.shippingTimeExpress}</span>
					)}
				</Box>
			</Box>

			<Box className="w-10/12 flex justify-start mt-1 mb-1">
				<span className="text-2sm font-semibold">Ondemand Product</span>
			</Box>
			<Box className={styles.infoBox}>
				<Box className={styles.subInfoBox}>
					<span className="text-2sm">Shipping cost / km</span>
					{editDetails ? (
						<TextField
							id="standard-number"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="standard"
							label={`$ ${props?.shippingOndemandCost}`}
							sx={{
								width: '50px',
							}}
							onChange={(e: any) =>
								setProfileDetails({
									...profileDetails,
									shippingOndemandCost: Number(e.target.value),
								})
							}
						/>
					) : (
						<span className="text-2sm">$ {props.shippingOndemandCost}</span>
					)}
				</Box>
			</Box>
			<Box className={styles.infoBox}>
				<Box className={styles.subInfoBox}>
					<span className="text-2sm">Shipping time / km</span>
					{editDetails ? (
						<TextField
							id="standard-number"
							type="string"
							InputLabelProps={{
								shrink: true,
							}}
							variant="standard"
							label={`${props?.shippingOndemandTime}`}
							sx={{
								width: '100px',
							}}
							onChange={(e: any) =>
								setProfileDetails({
									...profileDetails,
									shippingOndemandTime: e.target.value,
								})
							}
						/>
					) : (
						<span className="text-2sm">{props.shippingOndemandTime}</span>
					)}
				</Box>
			</Box>

			<Box className="w-full h-full flex flex-col justify-center items-center">
				<Box></Box>
				<Box className="w-full flex justify-end items-end">
					{editDetails ? (
						<AddCircleOutlineOutlinedIcon
							fontSize="small"
							onClick={handleUpdate}
						/>
					) : (
						<ModeEditOutlineOutlinedIcon
							fontSize="small"
							onClick={() => setEditDetails(true)}
						/>
					)}
				</Box>
			</Box>
		</div>
	);
}

export default DetailsComponent;
