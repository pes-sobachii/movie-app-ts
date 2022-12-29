import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {RootState} from "../store";
import {FetchedItemType, WholeFetchedData} from "../../Components/Types/Types";

interface PopularSliceState {
    items: FetchedItemType[];
    totalPages: number;
    currentPage: number;
    isLoading: boolean;
    totalResults: number;
}

export const fetchSearched = createAsyncThunk<WholeFetchedData, {query: string, page: number}>(
    'search/fetchSearchStatus',
    async ({query, page}) => {
        const { data } = await axios.get<WholeFetchedData>(`https://api.themoviedb.org/3/search/movie?api_key=01f18a9a2414c9fb525e9c4b48fea2b1&language=en-US&query=${query}&page=${page}`)
        return data;
    },
);

export const fetchNowAired = createAsyncThunk<WholeFetchedData>(
    'search/fetchNowAired',
    async () => {
        const { data } = await axios.get<WholeFetchedData>(`https://api.themoviedb.org/3/movie/now_playing?api_key=01f18a9a2414c9fb525e9c4b48fea2b1&language=en-US&page=1`)
        return data;
    },
);


const initialState: PopularSliceState = {
    items: [],
    totalPages: 0,
    currentPage: 0,
    isLoading: false,
    totalResults: 0
};

const popularSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        removeItems(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearched.pending, (state) => {
            state.items = [];
            state.totalPages = 0
            state.currentPage = 0
            state.totalResults = 0
            state.isLoading = true;
        });

        builder.addCase(fetchSearched.fulfilled, (state, action) => {
            state.items = action.payload.results;
            state.totalPages = action.payload.total_pages;
            state.currentPage = action.payload.page;
            state.totalResults = action.payload.total_results
            state.isLoading = false;
        });

        builder.addCase(fetchSearched.rejected, (state) => {
            state.items = [];
            state.totalPages = 0
            state.currentPage = 0
            state.totalResults = 0
            state.isLoading = false;
        });

        builder.addCase(fetchNowAired.pending, (state) => {
            state.items = [];
            state.totalPages = 0
            state.currentPage = 0
            state.isLoading = true;
        });

        builder.addCase(fetchNowAired.fulfilled, (state, action) => {
            state.items = action.payload.results;
            state.totalPages = 0
            state.currentPage = 0
            state.isLoading = false;
        });

        builder.addCase(fetchNowAired.rejected, (state) => {
            state.items = [];
            state.totalPages = 0
            state.currentPage = 0
            state.isLoading = false;
        });
    },
});

export const searchedSelector = (state: RootState) => state.searchSlice.items
export const isLoadingSelector = (state: RootState) => state.searchSlice.isLoading
export const totalSearchPagesSelector = (state: RootState) => state.searchSlice.totalPages
export const currentSearchPageSelector = (state: RootState) => state.searchSlice.currentPage
export const totalSearchResultsSelector = (state: RootState) => state.searchSlice.totalResults

export const {removeItems} = popularSlice.actions;

export default popularSlice.reducer;