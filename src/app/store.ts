import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/slices/productSlice';
import notificationReducer from '../features/notifications/slices/notificationSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import productTabsReducer from  '../features/products/slices/tabsSlice'
import recentSearchReducer from '../features/search/slices/recentSearchSlice';
import categoryReducer from '../features/categories/slices/categorySlice';
import discountsReducer from '../features/discounts/slices/discountSlice'
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  products: productReducer,
  notification: notificationReducer,
  productTabs: productTabsReducer,
  recentSearch: recentSearchReducer,
  categories: categoryReducer, 
  discounts: discountsReducer,
});

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