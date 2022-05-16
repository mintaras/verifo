import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from './features/transactions/transactionsSlice';

export default configureStore({
  reducer: {
    transactions: transactionsSlice,
  },
});
