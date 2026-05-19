import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { authService } from '../services/authService';

import toast from 'react-hot-toast';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),

    email: z.string().email('Invalid email address'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),

    confirmPassword: z.string(),

    role: z.enum(['ADMIN', 'SALES']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      role: 'SALES',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      await authService.register(data);

      toast.success('Registration successful! Please login.');

      navigate('/login');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Registration failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8"
        >
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Create Account
            </h2>

            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Sign up to get started
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              {/* Name */}
              <Input
                label="Full Name"
                {...register('name')}
                error={errors.name?.message}
              />

              {/* Email */}
              <Input
                label="Email address"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />

              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Role
                </label>

                <select
                  {...register('role')}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="SALES">Sales User</option>

                  <option value="ADMIN">Admin</option>
                </select>

                {errors.role && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  error={errors.password?.message}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Sign up
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Right */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-800 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <h1 className="text-4xl font-bold mb-4">
            Join Us Today
          </h1>

          <p className="text-lg opacity-90">
            Start managing your leads effectively with our
            powerful platform
          </p>
        </div>
      </div>
    </div>
  );
};