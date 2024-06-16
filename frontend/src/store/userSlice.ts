import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAdmin: boolean;
}

const initialState: UserState = {
  isAdmin: true, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export default userSlice.reducer;
