import { createSlice } from "@reduxjs/toolkit";

//create initial state
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //it's 'reducers' cuz these functions are used for reducing the current state
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload; //additional info come with action
      state.loading = false;
      state.error = null;
    },
    logInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logOutStart: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    logOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// destructuring userSlice.actions and create multiple bindings
export const {
  logInStart,
  logInSuccess,
  logInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
// why not userSlice.reducers? cuz redux toolkit generates and returns reducer based on reducers
