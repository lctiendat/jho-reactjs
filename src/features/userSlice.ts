import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Định nghĩa interface cho người dùng
export interface IUser {
    id: number;
    email: string;
    name: string;
}

interface UserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_BASE_URL + 'auth/login', credentials);

            localStorage.setItem('jho-token', response.data.data.token)

            return response.data.data;
        } catch (err: any) {
            console.log(err);

            return rejectWithValue(err.response.data);
        }
    }
);

// Đăng xuất
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    try {
        const response = await axios.get(API_BASE_URL + 'auth/logout', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jho-token')}`
            }
        });

        localStorage.clear()

        return response.data.data;
    } catch (err: any) {
        console.log(err);

        return rejectWithValue(err.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addMatcher(action => action.type.endsWith('/pending'), (state) => {
                state.loading = true;
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                console.log(action);

                state.error = action?.payload.message || 'An error occurred';
            });
    },
});

export default userSlice.reducer;
