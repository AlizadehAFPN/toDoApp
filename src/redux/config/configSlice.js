import { createSlice } from '@reduxjs/toolkit'

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    country: 'IR',
    theme: 'day',
  },
  reducers: {
    countryId: (state , action) => {
      state.country = action.payload
    },
  }
})
// Action creators are generated for each case reducer function
export const { changeLang , changeTheme , countryId } = configSlice.actions

export default configSlice.reducer