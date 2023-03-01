import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IResponse } from './../types/types';

export const fetchWordInfo = createAsyncThunk<
  IResponse[],
  string,
  { rejectValue: string }
>('word/fetchWordInfo', async (word, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<IResponse[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    if (data) {
      return data;
    } else {
      throw new Error('error');
    }
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const fetchRandomWordInfo = createAsyncThunk<string, undefined>(
  'word/fetchRandomWordInfo',
  async (_, { dispatch }) => {
    const { data } = await axios.get<IResponse[]>(
      `https://random-word-api.herokuapp.com/word`,
    );
    if (data) {
      dispatch(fetchWordInfo(data.join('')));
      return data.join('');
    } else {
      throw new Error('error');
    }
  },
);

interface IWordInfo {
  wordInfo: IResponse[] | null;
  error: string | unknown;
  loading: boolean;
  wordApi: string;
}

const initialState: IWordInfo = {
  wordInfo: null,
  error: null,
  loading: false,
  wordApi: '',
};

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchWordInfo.fulfilled,
      (state, action: PayloadAction<IResponse[]>) => {
        state.wordInfo = action.payload.slice(0, 1);
        state.loading = false;
        state.error = null;
      },
    );
    builder.addCase(fetchWordInfo.pending, (state) => {
      state.wordInfo = null;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchWordInfo.rejected,
      (state, action: PayloadAction<string | unknown>) => {
        state.wordInfo = null;
        state.loading = false;
        state.error = action.payload;
      },
    );
    builder.addCase(
      fetchRandomWordInfo.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.wordApi = action.payload;
      },
    );
  },
});

export default wordSlice.reducer;
