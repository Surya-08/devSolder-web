import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    getFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((item) => item._id !== action.payload);
      return newFeed;
    },
  },
});

export const { getFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
