import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: false,
  },
  reducers: {
    setlogin: (state) => {
      state.value = true
    },
    setlogout: (state) => {
      state.value = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { setlogin, setlogout  } = loginSlice.actions

export default loginSlice.reducer