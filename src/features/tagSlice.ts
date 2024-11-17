import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export interface ITag {
    id: number;
    name: string;
    color_code: string;
}

interface TagState {
    tags: ITag[];
    tag?: ITag;
    loading: boolean;
    error?: string;
}

const initialState: TagState = {
    tags: [],
    loading: false,
};

// Fetch all tags
export const fetchTags = createAsyncThunk('tag/fetchTags', async () => {
    const response = await axios.get(API_BASE_URL + 'tags');
    return response.data;
});

// Fetch tag by ID
export const fetchTagById = createAsyncThunk('tag/fetchTagById', async (id: number) => {
    const response = await axios.get(API_BASE_URL + `tags/${id}`);
    return response.data;
});

// Create tag
export const createTag = createAsyncThunk('tag/createTag', async (tag: Partial<ITag>) => {
    const response = await axios.post(API_BASE_URL + 'tags', tag);
    return response.data;
});

// Update tag
export const updateTag = createAsyncThunk('tag/updateTag', async (tag: ITag) => {
    const response = await axios.put(API_BASE_URL + `tags/${tag.id}`, tag);
    return response.data;
});

// Delete tag
export const deleteTag = createAsyncThunk('tag/deleteTag', async (id: number) => {
    await axios.delete(API_BASE_URL + `tags/${id}`);
    return id;
});

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.fulfilled, (state, action: PayloadAction<ITag[]>) => {
                state.tags = action.payload;
                state.loading = false;
            })
            .addCase(fetchTagById.fulfilled, (state, action: PayloadAction<ITag>) => {
                state.tag = action.payload;
                state.loading = false;
            })
            .addCase(createTag.fulfilled, (state, action: PayloadAction<ITag>) => {
                state.tags.push(action.payload);
            })
            .addCase(updateTag.fulfilled, (state, action: PayloadAction<ITag>) => {
                const index = state.tags.findIndex(tag => tag.id === action.payload.id);
                if (index !== -1) state.tags[index] = action.payload;
            })
            .addCase(deleteTag.fulfilled, (state, action: PayloadAction<number>) => {
                state.tags = state.tags.filter(tag => tag.id !== action.payload);
            })
            .addMatcher(action => action.type.endsWith('/pending'), (state) => {
                state.loading = true;
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.error = action?.error.message;
            });
    },
});

export default tagSlice.reducer;
