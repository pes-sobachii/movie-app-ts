import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { initialStateType, WholeFetchedData } from '../../Types/Types'

export const fetchPopular = createAsyncThunk<WholeFetchedData, number>(
	'popular/fetchPopularStatus',
	async (num: number) => {
		const { data } = await axios.get<WholeFetchedData>(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=01f18a9a2414c9fb525e9c4b48fea2b1&language=en-US&page=${num}`
		)
		return data
	}
)

const initialState: initialStateType = {
	items: [],
	totalPages: 1,
	currentPage: 1,
	isLoading: false,
}

const popularSlice = createSlice({
	name: 'popular',
	initialState,
	reducers: {
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPopular.pending, (state) => {
			state.isLoading = true
			state.items = []
		})

		builder.addCase(fetchPopular.fulfilled, (state, action) => {
			state.items = action.payload.results
			state.totalPages = action.payload.total_pages
			state.isLoading = false
		})

		builder.addCase(fetchPopular.rejected, (state) => {
			state.isLoading = false
			state.totalPages = 0
			state.items = []
		})
	},
})

export const popularSelector = (state: RootState) => state.popularSlice.items
export const totalPagesSelector = (state: RootState) =>
	state.popularSlice.totalPages
export const currentPageSelector = (state: RootState) =>
	state.popularSlice.currentPage
export const isLoadingPopularSelector = (state: RootState) =>
	state.popularSlice.isLoading

export const { setCurrentPage } = popularSlice.actions

export default popularSlice.reducer
