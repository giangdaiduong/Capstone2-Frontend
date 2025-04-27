import React, { useState } from 'react';
import { toast, Toaster } from 'sonner'; // Import toast and Toaster from sonner
import { verifyOtp } from '../api/userApi';

const VerifyOtp = () => {
    const [form, setForm] = useState({ email: '', otp: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                Email: form.email,
                OTP: form.otp,
            };
            const res = await verifyOtp(payload);
            toast.success(res.data.message || 'Xác thực OTP thành công!'); // Show success toast
        } catch (err) {
            toast.error('Xác thực thất bại: ' + (err.response?.data?.message || err.message)); // Show error toast
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
                <input
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                />
                <input
                    name="otp"
                    placeholder="Nhập mã OTP"
                    value={form.otp}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Xác thực OTP
                </button>
            </form>

            <Toaster position="top-right" /> {/* Position the toaster at the top-right */}
        </div>
    );
};

export default VerifyOtp;
