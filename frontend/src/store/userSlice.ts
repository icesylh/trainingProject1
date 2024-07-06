import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAdmin: boolean;
}

const initialState: UserState = {
  isAdmin: false, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<boolean>): void => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setAdmin } = userSlice.actions;
export default userSlice.reducer;
