export const updateToken = (token) => {
	return {
		type: 'UPDATE',
		payload: token,
	};
};
