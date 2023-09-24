import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import {
	Alert,
	AlertColor,
	Box,
	Snackbar,
	Backdrop,
	CircularProgress,
	TextField,
} from '@mui/material';
import { MarkerF } from '@react-google-maps/api';
import { updateMyConsumerProfileLocation } from '../../../components/marketplace/API';
import { fetchToken } from '../../../components/marketplace/token';

function ShowMap() {
	const center = {
		lat: 37.7749,
		lng: -122.4194,
	};
	const [currentPosition, setCurrentPosition] = useState(center);
	const [open, setOpen] = useState(false);
	const [description, setDescription] = useState('');
	const [alertTxt, setAlertTxt] = useState('');
	const [alertStatus, setAlertStatus] = useState<AlertColor>(
		'success' || 'warning' || 'info' || 'error'
	);
	const [openAlert, setOpenAlert] = useState(false);

	const containerStyle = {
		width: '100%',
		height: '75%',
	};

	const onMarkerDragEnd = (event: any) => {
		const lat = event.latLng.lat();
		const lng = event.latLng.lng();
		setCurrentPosition({ lat, lng });
	};

	const handleFindMyLocation = () => {
		try {
			setOpen(true);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					setCurrentPosition({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					if (position.coords.latitude && position.coords.longitude) {
						setOpen(false);
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenAlert(false);
	};

	const handleAddMyLocation = async () => {
		try {
			const token = fetchToken();
			const update = await updateMyConsumerProfileLocation(token, {
				location: {
					type: 'Point',
					coordinates: [currentPosition.lng, currentPosition.lat],
					description: description,
				},
			});
			setOpenAlert(true);
			setAlertStatus('success');
			setAlertTxt('location updated');
			setDescription('');
			history.back();
		} catch (error) {
			console.log(error);
			setOpenAlert(true);
			setAlertStatus('error');
			setAlertTxt('Something goes wrong');
		}
	};

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
		libraries: ['geometry', 'drawing'],
	});

	const styles = {
		page: `w-screen flex flex-col justify-center items-center`,
		container: `w-screen max-w-md h-screen flex flex-col justify-start items-center`,
		btn: `bg-green px-3 py-1 h-8 rounded-xl text-3sm font-bold text-white`,
		btn_box: `w-full flex justify-around items-center mt-auto mb-auto`,
	};

	return (
		<Box className={styles.page}>
			<Box className={styles.container}>
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={open}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				{isLoaded && (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={currentPosition}
						zoom={10}
						options={{
							zoomControl: false,
						}}
					>
						<MarkerF
							position={currentPosition}
							draggable={true}
							onDragEnd={onMarkerDragEnd}
						/>
					</GoogleMap>
				)}
				<Box className="w-full flex justify-center items-center mt-5">
					<TextField
						id="outlined-basic"
						label="Additional description"
						variant="outlined"
						className="w-11/12"
						value={description}
						onChange={(e: any) => setDescription(e.target.value)}
					/>
				</Box>
				<Box className={styles.btn_box}>
					<button className={styles.btn} onClick={handleFindMyLocation}>
						Find my location
					</button>
					<button className={styles.btn} onClick={handleAddMyLocation}>
						Add my location
					</button>
				</Box>
			</Box>
			<Snackbar open={openAlert} autoHideDuration={4500} className="w-full">
				<Alert
					variant="filled"
					onClose={handleClose}
					severity={alertStatus}
					className="w-11/12"
				>
					{alertTxt}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default ShowMap;
