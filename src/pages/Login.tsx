import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/userAuth';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).nonempty('Email is required'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }).nonempty('Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const { login, loading, error, user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();

    if (user) {
        navigate('/dashboard', { replace: true });
    }

    const handleLogin = async (data: LoginFormInputs) => {
        const { email, password } = data;
        login(email, password);
    };

    // State to control password visibility
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-800">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-white text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-400">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-400">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}  // Toggle password visibility
                            id="password"
                            {...register('password')}
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        
                        {/* Toggle button for password visibility */}
                        <button
                            type="button"
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#DD5313] py-2 px-4 rounded text-white"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
