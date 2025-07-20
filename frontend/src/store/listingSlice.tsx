import { TJobListing } from "@/Types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchListingsThunk = createAsyncThunk('listings/fetchListings', async () => {
    const response = await axios.get("http://localhost:5000/api/listings");
    return response.data
})

type ListingState = {
    listings: TJobListing[];
    loading: boolean;
    error: string | null;
    sortOption: string;
}
const initialState:ListingState = {
    listings: [],
    loading: false,
    error: null,
    sortOption: '',
}

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        addListing: (state, action:PayloadAction<TJobListing>) => {
            if (state.listings){
                state.listings.push(action.payload);
            }
        },
        editListing: (state, action:PayloadAction<{listings:TJobListing}>) => {
            const updatedListings = action.payload.listings;
            
            if (state.listings) {
                const index = state.listings?.findIndex((reduxListings) => reduxListings._id === updatedListings._id);
                    if (index !== -1){
                        state.listings[index] = updatedListings;
                    }
            }
        },
        removeListing: (state, action:PayloadAction<TJobListing>) => {
            if (state.listings){
                state.listings = state.listings?.filter((listings) => 
                    listings._id !== action.payload._id)
            }
        },
        addFavorite: (state, action:PayloadAction<{listings:TJobListing; userID:string}>) => {
            const {listings, userID} = action.payload;
            if (!state.listings) {return}
            
            const listingsIndex = state.listings.findIndex((reduxlistings) => reduxlistings._id === listings._id);
            if (listingsIndex !== -1) {
                const currentListings = state.listings[listingsIndex];
            
                if (!currentListings.favorites?.includes(userID)) {
                    state.listings[listingsIndex] = {
                        ...currentListings, 
                        favorites: [...(currentListings.favorites || []), userID]
                    }
                }
            }          
        },
        removeFavorite: (state, action:PayloadAction<{listings:TJobListing; userID:string}>) => {
            const {listings, userID} = action.payload;
            if (!state.listings) {return}

            const listingsIndex = state.listings.findIndex((reduxListings) => reduxListings._id === listings._id);
            if (listingsIndex !== -1) {
                const currentListings = state.listings[listingsIndex];
                const currentfavorites = currentListings.favorites || [];
                if (currentListings.favorites?.includes(userID)) {
                    state.listings[listingsIndex] = {
                        ...currentListings!, 
                        favorites: currentfavorites.filter((favorite) => favorite !== userID)
                    }
                }
            }          
        },
        setSortOption: (state, action:PayloadAction<string>) => {
            state.sortOption = action.payload   
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListingsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchListingsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.listings = action.payload;
        });
        builder.addCase(fetchListingsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch listings';
        });
    },
});

export const {addListing, editListing, removeListing, addFavorite, removeFavorite, setSortOption} = listingSlice.actions;
export default listingSlice.reducer;