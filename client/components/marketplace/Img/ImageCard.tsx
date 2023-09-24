import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			image: '',
			rounded: false,
		},
	};
};

function ImageCard(props: any) {
	const myLoader = () => {
		return `${props.image}`;
	};

	const styles = {
		img: `w-full h-full`,
		rounded_img: `w-full h-full rounded-full`,
	};

	return (
		<div className="w-full h-full">
			<Image
				alt="#"
				crossOrigin="anonymous"
				src={`${props.image}`}
				loader={myLoader}
				width={200}
				height={200}
				className={props.rounded ? styles.rounded_img : styles.img}
			/>
		</div>
	);
}

export default ImageCard;
