import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    getFeed: (state, action) => {
      return action.payload;
    },
  },
});

export const { getFeed } = feedSlice.actions;
export default feedSlice.reducer;
