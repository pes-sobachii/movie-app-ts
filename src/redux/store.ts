import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import popularSlice from './Slices/popularSlice'
import searchSlice from './Slices/searchSlice'
import upcomingSlice from './Slices/upcomingSlice'
import detailsSlice from './Slices/detailsSlice'

export const store = configureStore({
	reducer: {
		popularSlice,
		searchSlice,
		upcomingSlice,
		detailsSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
