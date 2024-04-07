import { configureStore } from "@reduxjs/toolkit";
// import userSliceReducer from "./userSlice";
import productSliceReducer from "./productSlide";

export const store = configureStore({
  reducer: {
    product : productSliceReducer,
    
  },
});
