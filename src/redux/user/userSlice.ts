import { ProfileInterface } from '@/src/clientPages/profile/profile.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStateInterface {
  user: ProfileInterface | null;
  isAuthenticated: boolean;
}

const initialState: UserStateInterface = {
  user: null,
  isAuthenticated: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ProfileInterface>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = usersSlice.actions;

export default usersSlice.reducer;
