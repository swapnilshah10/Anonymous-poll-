import { createSlice } from '@reduxjs/toolkit'

let login = false
if (localStorage.getItem('token')) {
  login = true
}


export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: login,
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