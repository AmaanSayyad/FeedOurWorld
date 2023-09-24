import { Box } from '@mui/material';
import { GetStaticProps } from 'next';
import React from 'react';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			setConfirm: null,
		},
	};
};

function DebitCard(props: any) {
	const handleContinue = () => {
		try {
			props.setConfirm({
				address: true,
				payment: true,
				debitCard: true,
				order: false,
				value: 3,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const styles = {
		card: `w-full flex flex-col justify-around items-center max-w-md`,
		bigTxt: `font-bold text-2sm`,
		subCards: `w-11/12 h-8 rounded-3xl p-2 bg-white border-1 border-light-gray flex justify-start items-center mb-5`,
		input: `w-full h-full rounded-3xl p-2 focus:outline-none text-3sm placeholder:text-2sm`,
		smallSubCard: `w-5/12 h-9 text-2sm p-2 bg-white border-1 border-light-gray flex justify-start items-center rounded-3xl`,
		inputBg: `w-full h-full focus:outline-none`,
		bellowBox: `w-full h-60 flex flex-col justify-center items-center border-1 border-light-gray rounded-2xl`,
		btn: `rounded-2xl h-full w-11/12 p-1 bg-green text-2sm font-semibold`,
	};

	return (
		<Box className={styles.card}>
			<Box className={styles.bellowBox}>
				<Box className="w-full flex flex-col justify-center items-center">
					<Box className={styles.subCards}>
						<input
							type="text"
							placeholder="Card Holder Name"
							className={styles.input}
						/>
					</Box>

					<Box className={styles.subCards}>
						<input
							type="number"
							placeholder="Card number"
							className={styles.input}
						/>
					</Box>

					<Box className="w-10/12">
						<span className="font-semibold text-2sm">Expiry date</span>
					</Box>

					<Box className="w-11/12 flex justify-between items-center">
						<Box className={styles.smallSubCard}>
							<select name="pets" id="pet-select" className={styles.inputBg}>
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
						</Box>
						<Box className={styles.smallSubCard}>
							<select name="pets" id="pet-select" className={styles.inputBg}>
								<option value="2023">2023</option>
								<option value="2023">2023</option>
								<option value="2024">2024</option>
								<option value="2025">2025</option>
								<option value="2026">2026</option>
								<option value="2027">2027</option>
								<option value="2028">2028</option>
								<option value="2029">2029</option>
								<option value="2030">2030</option>
							</select>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box className="w-9/12 mt-5 flex justify-between items-center">
				<input type="checkbox" name="" id="" />
				<span className="text-2sm font-semibold">
					I agree to the terms of the payment
				</span>
			</Box>
			<Box className="w-full h-8 mt-5 mb-5 flex justify-center items-center">
				<button className={styles.btn} onClick={handleContinue}>
					Continue
				</button>
			</Box>
		</Box>
	);
}

export default DebitCard;
