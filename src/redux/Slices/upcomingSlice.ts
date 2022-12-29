import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {RootState} from "../store";
import {initialStateType, WholeFetchedData} from "../../Components/Types/Types";

export const fetchUpcoming = createAsyncThunk<WholeFetchedData, number>(
    'upcoming/fetchUpcomingSliceStatus',
    async (num:number = 1) => {
        const { data } = await axios.get<WholeFetchedData>(`https://api.themoviedb.org/3/movie/upcoming?api_key=01f18a9a2414c9fb525e9c4b48fea2b1&language=en-US&page=${num}`)
        return data;
    },
);

const initialState: initialStateType = {
    items: [],
    totalPages: 0,
    currentPage: 0,
    isLoading: false,
};

const upcomingSlice = createSlice({
    name: 'upcoming',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUpcoming.pending, (state) => {
            state.isLoading = true
            state.totalPages = 0;
            state.currentPage = 0;
            state.items = [];
        });

        builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
            state.items = action.payload.results;
            state.totalPages = action.payload.total_pages;
            state.currentPage = action.payload.page;
            state.isLoading = false
        });

        builder.addCase(fetchUpcoming.rejected, (state) => {
            state.isLoading = false;
            state.totalPages = 0;
            state.currentPage = 0;
            state.items = [];
        });
    },
});

export const upcomingSelector = (state: RootState) => state.upcomingSlice.items
export const totalUpcomingSlicePagesSelector = (state: RootState) => state.upcomingSlice.totalPages
export const currentUpcomingPageSelector = (state: RootState) => state.upcomingSlice.currentPage


export const { } = upcomingSlice.actions;

export default upcomingSlice.reducer;