import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  loading: boolean
  displayName?: string;
  email?: string;
  uid?: string;
  photoURL?: string;
}

const initialState: UserState = {
  loading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {

    },
    setUser: (state, action: PayloadAction<any>) => {
      const { displayName, email, uid, photoURL } = action.payload;
      state.loading = false;
      //const nState = {...state, ...action.payload};
      //console.log(nState);
      state.displayName = displayName;
      state.email = email;
      state.uid = uid;
      state.photoURL = photoURL;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setLoading } = userSlice.actions

export default userSlice.reducer