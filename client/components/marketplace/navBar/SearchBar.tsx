import { Box } from '@mui/material';
import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

function SearchBar() {
	const styles = {
		lowerNav2: `flex w-full h-12 justify-around items-center bg-white max-w-screen-sm`,
	};
	return (
		<Box className={styles.lowerNav2}>
			<Box className="w-11/12 h-9 rounded-3xl p-1 border-1 border-light-gray flex justify-between items-center">
				<SearchOutlinedIcon />
				<input
					type="search"
					placeholder="Search"
					className="w-10/12 flex justify-center focus:outline-none items-center placeholder:text-2sm h-full rounded-3xl p-0.5"
				/>
				<FilterListOutlinedIcon />
			</Box>
		</Box>
	);
}

export default SearchBar;
