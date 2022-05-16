import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  fetched: false,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    hasFetched: (state, action) => {
      state.fetched = action.payload;
    },
    store: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { hasFetched, store } = transactionsSlice.actions;

export const fetchTransactions = () => (dispatch) => {
  dispatch(store(JSON.parse(window.localStorage.getItem('transfers'))));
  dispatch(hasFetched(true));
};

export const updateTransactions = (values) => (dispatch) => {
  try {
    const transfers = window.localStorage.getItem('transfers');
    const parsedTransfers = transfers ? JSON.parse(transfers) : [];

    window.localStorage.setItem(
      'transfers',
      JSON.stringify([{ ...values }, ...parsedTransfers]),
    );
    dispatch(store([{ ...values }, ...parsedTransfers]));
  } catch (e) {
    throw Error(e);
  }
};

export default transactionsSlice.reducer;
