import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const authenticatedSlice = createSlice({
    name: 'authenticated',
    initialState: { value: false },
    reducers: {
        checkAuth: (state, action) => {
            // const result =  await
        }
    }
})

export default authenticatedSlice.reducer;