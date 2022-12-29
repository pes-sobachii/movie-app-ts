import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import {RootState} from "../store";
import {initialStateType, WholeFetchedData} from "../../Components/Types/Types";


export const fetchPopular = createAsyncThunk<WholeFetchedData, number>(
    'popular/fetchPopularStatus',
    async (num:number = 1) => {
        const { data } = await axios.get<WholeFetchedData>(`https://api.themoviedb.org/3/movie/top_rated?api_key=01f18a9a2414c9fb525e9c4b48fea2b1&language=en-US&page=${num}`)
        return data;
    },
);

const initialState: initialStateType = {
    items: [],
    totalPages: 0,
    currentPage: 0,
    isLoading: false,
};

const popularSlice = createSlice({
    name: 'popular',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPopular.pending, (state, action) => {
            state.isLoading = true
            state.totalPages = 0;
            state.currentPage = 0;
            state.items = [];
        });

        builder.addCase(fetchPopular.fulfilled, (state, action) => {
            state.items = action.payload.results;
            state.totalPages = action.payload.total_pages;
            state.currentPage = action.payload.page;
            state.isLoading = false
        });

        builder.addCase(fetchPopular.rejected, (state, action) => {
            state.isLoading = false;
            state.totalPages = 0;
            state.currentPage = 0;
            state.items = [];
        });
    },
});

export const popularSelector = (state: RootState) => state.popularSlice.items
export const totalPagesSelector = (state: RootState) => state.popularSlice.totalPages
export const currentPageSelector = (state: RootState) => state.popularSlice.currentPage


export const {  } = popularSlice.actions;

export default popularSlice.reducer;