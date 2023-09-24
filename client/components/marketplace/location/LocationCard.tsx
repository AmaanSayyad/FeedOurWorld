import React, { useState } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import { Box } from '@mui/material';
import { MarkerF } from '@react-google-maps/api';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			lat: 0,
			lng: 0,
		},
	};
};

function LocationCard(props: any) {
	let myLocation = {
		lat: props?.lat,
		lng: props?.lng,
	};
	const containerStyle = {
		width: '100%',
		height: '100%',
		borderRadius: '16px',
	};

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
		libraries: ['geometry', 'drawing'],
	});

	return (
		<Box className="w-full h-full rounded-2xl">
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={myLocation}
					zoom={10}
					options={{
						zoomControl: false,
						mapTypeControl: false,
						streetViewControl: false,
						fullscreenControl: false,
					}}
				>
					<MarkerF position={myLocation} />
				</GoogleMap>
			)}
		</Box>
	);
}

export default LocationCard;
