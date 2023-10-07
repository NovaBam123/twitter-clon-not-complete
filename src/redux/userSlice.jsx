import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice ({
  name : 'user',
  initialState: {
    value : {}
  },
  reducers : {
    stateData: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setData } = userSlice.actions;
export const userReducers = userSlice.reducer;

export default userSlice;