import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TJobListing } from '@/Types';

export const fetchListingsThunk = createAsyncThunk('listings/fetchListings', async () => {
  const response = await axios.get('http://localhost:5000/api/listings');
  return response.data;
});

type ListingState = {
  listings: TJobListing[];
  loading: boolean;
  error: string | null;
  sortOption: string;
};
const initialState: ListingState = {
  listings: [],
  loading: false,
  error: null,
  sortOption: '',
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    addListing: (state, action: PayloadAction<TJobListing>) => {
      if (state.listings) {
        state.listings.push(action.payload);
      }
    },
    editListing: (state, action: PayloadAction<{ listings: TJobListing }>) => {
      const updatedListings = action.payload.listings;

      if (state.listings) {
        const index = state.listings?.findIndex(
          (reduxListings) => reduxListings._id === updatedListings._id
        );
        if (index !== -1) {
          state.listings[index] = updatedListings;
        }
      }
    },
    removeListing: (state, action: PayloadAction<TJobListing>) => {
      if (state.listings) {
        state.listings = state.listings?.filter((listings) => listings._id !== action.payload._id);
      }
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
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

export const { addListing, editListing, removeListing, setSortOption } = listingSlice.actions;
export default listingSlice.reducer;
