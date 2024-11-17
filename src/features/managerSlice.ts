import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export interface IManager {
    id: number;
    name: string;
    color_code: string;
}

interface ManagerState {
    managers: IManager[];
    manager?: IManager;
    loading: boolean;
    error?: string;
}

const initialState: ManagerState = {
    managers: [],
    loading: false,
};

export const fetchManagers = createAsyncThunk('manager/fetchManagers', async () => {
    
    const token = localStorage.getItem('jho-token');
    console.log(token);
    

    const response = await axios.get(API_BASE_URL + 'managers',{
        headers:{
            'Authorization' : `Bearer ${localStorage.getItem('jho-token')}`
        }
    });

    return response.data;
});

export const fetchManagerById = createAsyncThunk('manager/fetchManagerById', async (id: number) => {
    const response = await axios.get(API_BASE_URL + `managers/${id}`);
    return response.data;
});

export const createManager = createAsyncThunk('manager/createManager', async (manager: Partial<IManager>) => {
    const response = await axios.post(API_BASE_URL + 'managers', manager);
    return response.data;
});

export const updateManager = createAsyncThunk('manager/updateManager', async (manager: IManager) => {
    const response = await axios.put(API_BASE_URL + `managers/${manager.id}`, manager);
    return response.data;
});

export const deleteManager = createAsyncThunk('manager/deleteManager', async (id: number) => {
    await axios.delete(API_BASE_URL + `managers/${id}`);
    return id;
});

const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchManagers.fulfilled, (state, action: PayloadAction<IManager[]>) => {
                state.managers = action.payload;
                state.loading = false;
            })
            .addCase(fetchManagerById.fulfilled, (state, action: PayloadAction<IManager>) => {
                state.manager = action.payload;
                state.loading = false;
            })
            .addCase(createManager.fulfilled, (state, action: PayloadAction<IManager>) => {
                state.managers.push(action.payload);
            })
            .addCase(updateManager.fulfilled, (state, action: PayloadAction<IManager>) => {
                const index = state.managers.findIndex(manager => manager.id === action.payload.id);
                if (index !== -1) state.managers[index] = action.payload;
            })
            .addCase(deleteManager.fulfilled, (state, action: PayloadAction<number>) => {
                state.managers = state.managers.filter(manager => manager.id !== action.payload);
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

export default managerSlice.reducer;
