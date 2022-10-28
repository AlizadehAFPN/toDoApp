import {createSlice} from '@reduxjs/toolkit';

export const biometricSlice = createSlice({
  name: 'biometric',
  // we may have more data about the biometric in future, so I considered it as an object
  initialState: {value:false},
  reducers: {
    changeBiometric: (state, action) => {
      state.value = action.payload
    },
  },
});
// Action creators are generated for changeBiometric reducer function
export const {changeBiometric } = biometricSlice.actions;

export default biometricSlice.reducer;
