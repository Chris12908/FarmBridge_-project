"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Address, CreateAddressDto } from "@/lib/types/address.types";
import { cn } from "@/lib/utils";

const addressSchema = z.object({
  label: z.string().min(1, "Label is required (e.g. Home, Office)"),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State / county is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  isDefault: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  defaultValues?: Partial<Address>;
  onSubmit: (data: CreateAddressDto) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function AddressForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Save Address",
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: defaultValues?.label ?? "",
      street: defaultValues?.street ?? "",
      city: defaultValues?.city ?? "",
      state: defaultValues?.state ?? "",
      country: defaultValues?.country ?? "Kenya",
      postalCode: defaultValues?.postalCode ?? "",
      isDefault: defaultValues?.isDefault ?? false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Label */}
      <div>
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
          Address Label
        </label>
        <input
          {...register("label")}
          placeholder="e.g. Home, Office, Farm"
          className={inputCls(!!errors.label)}
        />
        {errors.label && <p className="text-xs text-red-500 mt-1">{errors.label.message}</p>}
      </div>

      {/* Street */}
      <div>
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
          Street Address
        </label>
        <input
          {...register("street")}
          placeholder="123 Farm Road"
          className={inputCls(!!errors.street)}
        />
        {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street.message}</p>}
      </div>

      {/* City + State */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            City
          </label>
          <input
            {...register("city")}
            placeholder="Nairobi"
            className={inputCls(!!errors.city)}
          />
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            State / County
          </label>
          <input
            {...register("state")}
            placeholder="Nairobi County"
            className={inputCls(!!errors.state)}
          />
          {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
        </div>
      </div>

      {/* Country + Postal */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            Country
          </label>
          <input
            {...register("country")}
            placeholder="Kenya"
            className={inputCls(!!errors.country)}
          />
          {errors.country && (
            <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            Postal Code
          </label>
          <input
            {...register("postalCode")}
            placeholder="00100"
            className={inputCls(!!errors.postalCode)}
          />
          {errors.postalCode && (
            <p className="text-xs text-red-500 mt-1">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      {/* Set as default */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          {...register("isDefault")}
          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
        />
        <span className="text-sm text-slate-700 dark:text-slate-300">Set as default address</span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-60 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          {isLoading && (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          )}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all",
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-slate-200 dark:border-slate-700 focus:border-primary"
  );
}
