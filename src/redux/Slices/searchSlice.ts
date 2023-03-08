import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {RootState} from "../store";
import {FetchedItemType, WholeFetchedData} from "../../Types/Types";

interface SearchSliceState {
    items: FetchedItemType[];
    totalPages: number;
    currentPage: number;
    isLoading: boolean;
    totalResults: number;
    query: string;
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


const initialState: SearchSliceState = {
    items: [],
    totalPages: 1,
    currentPage: 1,
    isLoading: false,
    totalResults: 0,
    query: ''
};

const popularSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        removeItems(state) {
            state.items = [];
            state.query = '';
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setStateQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearched.pending, (state) => {
            state.items = [];
            state.isLoading = true;
        });

        builder.addCase(fetchSearched.fulfilled, (state, action) => {
            state.items = action.payload.results;
            state.totalPages = action.payload.total_pages;
            state.totalResults = action.payload.total_results
            state.isLoading = false;
        });

        builder.addCase(fetchSearched.rejected, (state) => {
            state.items = [];
            state.totalPages = 0
            state.totalResults = 0
            state.isLoading = false;
        });

        builder.addCase(fetchNowAired.pending, (state) => {
            state.items = [];
            state.totalPages = 0
            state.currentPage = 1
            state.totalResults = 0
            state.isLoading = true;
        });

        builder.addCase(fetchNowAired.fulfilled, (state, action) => {
            state.items = action.payload.results;
            state.isLoading = false;
        });

        builder.addCase(fetchNowAired.rejected, (state) => {
            state.items = [];
            state.isLoading = false;
        });
    },
});

export const searchedSelector = (state: RootState) => state.searchSlice.items
export const isLoadingSelector = (state: RootState) => state.searchSlice.isLoading
export const totalSearchPagesSelector = (state: RootState) => state.searchSlice.totalPages
export const currentSearchPageSelector = (state: RootState) => state.searchSlice.currentPage
export const totalSearchResultsSelector = (state: RootState) => state.searchSlice.totalResults
export const querySelector = (state: RootState) => state.searchSlice.query

export const { setStateQuery, setCurrentPage, removeItems } = popularSlice.actions;

export default popularSlice.reducer;