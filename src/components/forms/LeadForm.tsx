import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

import type { Lead } from '../../types';

import {
  LeadStatusEnum,
  LeadSourceEnum,
} from '../../types/enums';

const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters'),

  email: z
    .string()
    .email('Invalid email address'),

  phone: z.string().optional(),

  company: z.string().optional(),

  status: z.enum([
    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'LOST',
  ]),

  source: z.enum([
    'WEBSITE',
    'INSTAGRAM',
    'REFERRAL',
  ]),

  note: z.string().optional(), // Changed from 'notes' to 'note' to match backend
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  initialData?: Lead;

  onSubmit: (data: LeadFormData) => void;

  isLoading?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),

    defaultValues: {
      name: initialData?.name || '',

      email: initialData?.email || '',

      phone: initialData?.phone || '',

      company: initialData?.company || '',

      status: initialData?.status || 'NEW',

      source: initialData?.source || 'WEBSITE',

      note: initialData?.note || '', // Changed from 'notes' to 'note'
    },
  });

  const statusOptions = Object.entries(
    LeadStatusEnum
  ).map(([key, value]) => ({
    value,
    label: key,
  }));

  const sourceOptions = Object.entries(
    LeadSourceEnum
  ).map(([key, value]) => ({
    value,
    label: key.replace('_', ' '),
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <Input
          label="Phone"
          {...register('phone')}
          error={errors.phone?.message}
        />

        {/* Company */}
        <Input
          label="Company"
          {...register('company')}
          error={errors.company?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>

          <select
            {...register('status')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {statusOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Source
          </label>

          <select
            {...register('source')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {sourceOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          {errors.source && (
            <p className="mt-1 text-sm text-red-500">
              {errors.source.message}
            </p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes
        </label>

        <textarea
          {...register('note')} // Changed from 'notes' to 'note'
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
          placeholder="Add any additional notes about this lead..."
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4 border-t dark:border-gray-700">
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full sm:w-auto"
        >
          {initialData
            ? 'Update Lead'
            : 'Create Lead'}
        </Button>
      </div>
    </form>
  );
};