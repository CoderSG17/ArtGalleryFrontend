import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  // productList: [],
  cartItem:[]
  
};


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increaseQty: (state, action) => {
      console.log(action.payload)
      console.log(state.cartItem)
      const index = state.cartItem.findIndex((elem) => elem._id === action.payload);
      console.log(index)
      // let qty = state.cartItem[index].qty;
      // // console.log(qty)
      // const qtyInc = ++qty;
      // // console.log(qtyInc)
      // state.cartItem[index].qty = qtyInc;
      // // console.log(qty)


      // const price = state.cartItem[index].price;
      // console.log(price)
      // const priceInNumber =  parseFloat(price)
      // // console.log(priceInNumber)
      // // const priceTill3Decimal = priceInNumber.toFixed(3)

      // const total = priceInNumber * qtyInc;
      // console.log(total)
      // state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((elem) => elem._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const priceInNumber =  parseFloat(price)

        // const priceTill3Decimal = priceInNumber.toFixed(3)

        const total = priceInNumber * qtyDec;
        console.log(total)

        state.cartItem[index].total = total;
      }
    },
    clearCart:(state) => {
      toast.success("Cart cleared");
      state.cartItem=[];
    },
    // logoutUser:(state) => {
    //   state.cartItem=[];
    // }
  },
});


export const {
  // setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,
  logoutUser,
} = productSlice.actions;



export default productSlice.reducer;
