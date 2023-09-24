import { Box } from '@mui/material';
import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ImageCard from '../Img/ImageCard';
import { removeItemFromCart } from '../API';
import { fetchToken } from '../token';
import 'animate.css';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			loadFunc: null,
			image: '',
			name: '',
			quantity: 0,
			unit: '',
			id: '',
			orderTotal: '',
		},
	};
};

function CartProductCardComponent(props: any) {
	const [click, setClick] = useState(false);

	const handleRemove = async () => {
		try {
			const token = fetchToken();
			const res = await removeItemFromCart(token, props.id);
			props.loadFunc();
		} catch (error) {
			console.log(error);
		}
	};

	const styles = {
		container: `w-11/12 border-1 border-light-gray rounded-2xl h-12 flex justify-around items-center`,
		animate_container: `w-11/12 border-1 border-light-gray rounded-2xl h-12 flex justify-around items-center animate__animated animate__lightSpeedOutLeft`,
	};
	return (
		<Box
			className={!click ? styles.container : styles.animate_container}
			onClick={() => setClick(true)}
		>
			<Box className="w-10 h-10 rounded-full">
				<ImageCard image={props.image} />
			</Box>
			<span className="text-sm">{props.name}</span>
			<span className="text-sm">
				{props.quantity} {props.unit}
			</span>
			<span className="text-sm font-semibold">
				$ {Number(props.orderTotal).toFixed(3)}
			</span>
			<Box
				className="w-10 h-10 flex justify-center items-center"
				onClick={handleRemove}
			>
				<DeleteOutlinedIcon fontSize="medium" className="" />
			</Box>
		</Box>
	);
}

export default CartProductCardComponent;
