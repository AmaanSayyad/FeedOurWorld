export const fetchToken = (): string => {
	try {
		const tokenObj = localStorage.getItem('Token') || null;
		let Token;
		if (tokenObj) {
			Token = JSON.parse(tokenObj).value;
		}
		return Token;
	} catch (error) {
		console.log(error);
		return '';
	}
};
