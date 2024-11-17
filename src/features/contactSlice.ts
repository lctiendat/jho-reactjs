import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export interface IContact {
    id: number;
    name: string;
    email: string;
    phone: string;
    managed_by: number;
    tags: Array<string>
}

interface ContactState {
    contacts: IContact[];
    contact?: IContact;
    loading: boolean;
    error?: string;
    success?: boolean
}

const initialState: ContactState = {
    contacts: [],
    loading: false,
    success: false
};

export const fetchContacts = createAsyncThunk('contact/fetchContacts', async () => {


    const token = localStorage.getItem('jho-token')
    const response = await axios.get(API_BASE_URL + 'contacts', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data.data;
});

export const fetchContactById = createAsyncThunk('contact/fetchContactById', async (id: number) => {
    const response = await axios.get(API_BASE_URL + `contacts/${id}`);
    return response.data;
});

export const createContact = createAsyncThunk('contact/createContact', async (contact: Partial<IContact>, { rejectWithValue }) => {

    try {
        const response = await axios.post(API_BASE_URL + 'contacts', contact, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jho-token')}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response.data);

    }

});

export const updateContact = createAsyncThunk('contact/updateContact', async (contact: IContact) => {
    const response = await axios.put(API_BASE_URL + `contacts/${contact.id}`, contact);
    return response.data;
});

export const deleteContact = createAsyncThunk('contact/deleteContact', async (id: number) => {
    await axios.delete(API_BASE_URL + `contacts/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jho-token')}`
        }
    });
    return id;
});

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = undefined;  // Reset error to undefined
            state.success = true;  // Optionally, reset success if you want
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<IContact[]>) => {
                state.contacts = action.payload;
                state.loading = false;
            })
            .addCase(fetchContactById.fulfilled, (state, action: PayloadAction<IContact>) => {
                state.contact = action.payload;
                state.loading = false;
            })
            .addCase(createContact.fulfilled, (state, action: PayloadAction<IContact>) => {
                state.contacts.push(action.payload);
                console.log(7777);
                state.success = true
            })
            .addCase(createContact.rejected, (state, action: PayloadAction<any>) => {  // Chú ý PayloadAction<any> thay vì IContact
                state.success = false;
                state.error = action?.payload?.message || 'An error occurred';  // action.payload có thể là thông điệp lỗi
                console.log(2222);
                
            })
            .addCase(updateContact.fulfilled, (state, action: PayloadAction<IContact>) => {
                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) state.contacts[index] = action.payload;
                state.success = true
            })
            .addCase(deleteContact.fulfilled, (state, action: PayloadAction<number>) => {
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            })
            .addMatcher(action => action.type.endsWith('/pending'), (state) => {
                state.loading = true;
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.success = false
                state.error = action?.payload.message || 'An error occurred';
            });
    },
});

export const { resetError } = contactSlice.actions;  // Export the resetError action


export default contactSlice.reducer;
