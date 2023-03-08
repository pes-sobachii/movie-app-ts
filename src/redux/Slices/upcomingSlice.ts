import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";

import {RootState} from "../store";
import {initialStateType, WholeFetchedData} from "../../Types/Types";

export const fetchUpcoming = createAsyncThunk<WholeFetchedData, number>(
    'upcoming/fetchUpcomingSliceStatus',
    async (num:number) => {
        const { data } = await axios.get<WholeFetchedData>(`https://api.themoviedb.org/3/movie/upcoming?api_key=01f18a9a2414c9fb525e9c4b48fea2b1&language=en-US&page=${num}`)
        return data;
    },
);

const initialState: initialStateType = {
    items: [],
    totalPages: 1,
    currentPage: 1,
    isLoading: false,
};

const upcomingSlice = createSlice({
    name: 'upcoming',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUpcoming.pending, (state) => {
            state.isLoading = true
            state.items = [];
        });

        builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
            state.items = action.payload.results;
            state.totalPages = action.payload.total_pages;
            state.isLoading = false
        });

        builder.addCase(fetchUpcoming.rejected, (state) => {
            state.isLoading = false;
            state.totalPages = 0;
            state.items = [];
        });
    },
});

export const upcomingSelector = (state: RootState) => state.upcomingSlice

export const { setCurrentPage } = upcomingSlice.actions;

export default upcomingSlice.reducer;