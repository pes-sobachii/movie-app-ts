import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import {
	detailsInitialStateType,
	FetchedItemDetailsType,
	WholeFetchedData,
} from '../../Types/Types'

export const fetchDetails = createAsyncThunk<FetchedItemDetailsType, number>(
	'details/fetchDetails',
	async (id: number) => {
		const { data } = await axios.get<FetchedItemDetailsType>(
			`https://api.themoviedb.org/3/movie/${id}?api_key=01f18a9a2414c9fb525e9c4b48fea2b1&language=en-US`
		)
		return data
	}
)

const initialState: detailsInitialStateType = {
	item: null,
	isLoading: false,
}

const detailsSlice = createSlice({
	name: 'details',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDetails.pending, (state) => {
			state.isLoading = true
			state.item = null
		})

		builder.addCase(fetchDetails.fulfilled, (state, action) => {
			state.item = action.payload
			state.isLoading = false
		})

		builder.addCase(fetchDetails.rejected, (state) => {
			state.isLoading = false
			state.item = null
		})
	},
})

export const detailsSelector = (state: RootState) => state.detailsSlice.item

export const {} = detailsSlice.actions

export default detailsSlice.reducer
