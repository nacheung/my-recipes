const initialState = {
    username: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, username: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;