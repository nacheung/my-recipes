import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/index'; 

const store = configureStore({
  reducer: userReducer, 
});

export default store;