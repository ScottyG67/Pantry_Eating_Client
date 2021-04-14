export const initialState = {
    username: '',
    loggedIn: false,
	BASE_URL: 'http://localhost:3000',
	userId: '',
	searchRecipes: [],
	savedRecipes: [],
	pantryItems:[],
	itemSearchResults:[],
	pantryCats:[]
}

export const reducer = (state, action) => {
    switch (action.type) {
			case 'SET_USERNAME':
				return {
					...state,
					username: action.username,
				};
			case 'SET_USER_ID':
				return {
					...state,
					userId: action.userId,
				};
			case 'SET_LOGGED_IN':
				return {
					...state,
					loggedIn: action.loggedIn,
				};
			case 'SET_RECIPES':
				return {
					...state,
					searchRecipes: action.searchRecipes
				}
			case 'SET_SAVED_RECIPE':
				return {
					...state,
					savedRecipes: action.savedRecipes
				}
			case 'SAVE_RECIPE':
				return {
					...state,
					savedRecipes: [...state.savedRecipes,action.savedRecipes]
				}
			case 'DELETE_RECIPE':
				debugger
				return {
					...state,
					savedRecipes: state.savedRecipes.filter( (recipe) => {return recipe.id !== action.deletedRecipe.id} )
				}
			case 'SET_PANTRY_ITEMS':
				return {
					...state,
					pantryItems: action.pantryItems
				}
			case 'SAVE_PANTRY_ITEM':
				return {
					...state,
					pantryItems: [...state.pantryItems, action.pantryItem]
				}
			case 'DELETE_PANTRY_ITEM':
				return {
					...state,
					pantryItems: state.pantryItems.filter( (item) => {return item.id !== action.deletedItem.id} )
				}
			case 'SET_ITEM_SEARCH_RESULTS':
				return {
					...state,
					itemSearchResults: action.itemSearchResults
				}
			case 'SET_PANTRY_CATS':
				return {
					...state,
					pantryCats: action.pantryCats
				}

			default:
				return state;
		}
}