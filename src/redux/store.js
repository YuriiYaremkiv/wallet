import { configureStore } from '@reduxjs/toolkit';
import { auth } from './auth/authSlice';
import transactionsSlice from './transactions/transactionsSlice';
import { translationReducer } from './translation/translationSlice';
import { themeModeSlice } from './theme/themeModeSlice';
import { transactionsCurrencySlice } from './currency/currencySlice';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const themeModePersistConfig = {
  key: 'themeMode',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, auth.reducer),
    transactions: transactionsSlice,
    translation: translationReducer,
    themeMode: persistReducer(themeModePersistConfig, themeModeSlice.reducer),
    current: transactionsCurrencySlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
