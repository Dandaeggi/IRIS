// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SaveTokenState {
  accessToken: string;
  refreshToken: string;
}

const initialState: SaveTokenState = {
  accessToken: "a",
  refreshToken: "b",
};

const saveTokenSlice = createSlice({
  name: "saveToken",
  initialState,
  reducers: {
    saveAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      // console.log("saveAccessToken", action);
    },
    savedRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
});

export default saveTokenSlice.reducer;
export const { saveAccessToken, savedRefreshToken } = saveTokenSlice.actions;
