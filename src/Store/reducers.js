export const initialState = {
    username: '',
    loggedIn: false,
	BASE_URL: 'http://localhost:3000'
}

export const reducer = (state, action) => {
    switch (action.type) {
			case 'SET_USERNAME':
				return {
					...state,
					username: action.username,
				};
			case 'SET_LOGGED_IN':
				return {
					...state,
					loggedIn: action.loggedIn,
				};
			default:
				return state;
		}
}