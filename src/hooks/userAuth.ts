import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../features/userSlice';
import { AppDispatch, RootState } from '../store';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    const login = (email: string, password: string) => {
        dispatch(loginUser({ email, password }));
    };

    const logout = () => {
        dispatch(logoutUser());
    };

    return { user, loading, error, login, logout };
};
