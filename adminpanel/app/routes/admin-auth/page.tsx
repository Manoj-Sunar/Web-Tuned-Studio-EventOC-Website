"use client";

import { useState, useCallback, memo } from "react";
import { Mail, Lock, NotebookText, Loader2 } from "lucide-react";

import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { LoginFormState } from "@/types/types";
import { adminLoginAction } from "@/app/server-actions/login-action";
import Link from "next/link";
import LoginInput from "@/Components/TextField/LoginInput";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader";
import ServerMsg from "@/Components/ServerMsg";

const AdminLoginPage: React.FC = () => {

    const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = useCallback((field: keyof LoginFormState, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }, []);

    const togglePasswordVisibility = useCallback(() => setShowPassword(prev => !prev), []);




    const handleFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("email", form.email);
            formData.append("password", form.password);

            const result = await adminLoginAction(formData);

            if (result.success) {
                localStorage.setItem("token", result.token!);
                router.push("/");
            } else {
                setError(result.error ?? "Login failed");
            }
        } catch (err: any) {
            setError(err?.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [form]);



    return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-background-light dark:bg-background-dark p-4">
            <div className="relative w-full max-w-md rounded-xl bg-white/80 dark:bg-background-dark/80 backdrop-blur-md shadow-xs border border-gray-100 overflow-hidden">
                <div className="p-8 sm:p-10 flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-6 justify-center">
                        <NotebookText className="text-primary text-4xl" />
                        <h2 className="text-2xl font-bold text-gray-800">EventFolio</h2>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 leading-tight">Admin Panel Login</h1>
                    <p className="text-slate-600 dark:text-slate-400 pt-2">Welcome back! Please enter your details.</p>
                </div>

                <form className="px-8 pb-8 space-y-6" onSubmit={handleFormSubmit}>
                    <LoginInput id="email" label="Email Address" placeholder="Enter your email" value={form.email} onChange={val => handleChange("email", val)} icon={<Mail />}  />
                    <LoginInput id="password" label="Password" placeholder="Enter your password" type={showPassword ? "text" : "password"} value={form.password} onChange={val => handleChange("password", val)} icon={<Lock />} togglePassword={togglePasswordVisibility} isPasswordVisible={showPassword} />

                    <div className="flex justify-end">
                        <Link href="#" className="text-[#137fec] text-sm underline hover:no-underline">Forgot your password?</Link>
                    </div>

                    {error && <ServerMsg errorMsg={error} />}

                    <PrimaryButton type="submit" label={loading ? <Loader /> : "Login"} className="h-12" />
                </form>

                <div className="bg-slate-100 px-8 py-4 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">© 2024 EventFolio. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default memo(AdminLoginPage);
