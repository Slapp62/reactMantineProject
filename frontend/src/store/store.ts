import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import listingSlice from './listingSlice';
import searchSlice from './searchSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
  userSlice,
  searchSlice,
  listingSlice,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['userSlice', 'listingSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
