"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSubmitReview } from "@/hooks/reviews/useSubmitReview";
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().max(500, "Comment must be under 500 characters").optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  orderId?: string;
  farmerId?: string;
  
  onSuccess?: () => void;
}

export function ReviewForm({ orderId, farmerId, onSuccess }: ReviewFormProps) {
  const [hovered, setHovered] = useState(0);
  const { submitReview, isPending, isSuccess } = useSubmitReview(farmerId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0 },
  });

  const rating = watch("rating");

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
            check_circle
          </span>
        </div>
        <p className="font-semibold text-slate-800 dark:text-slate-200">Review submitted!</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Thank you for your feedback.
        </p>
      </div>
    );
  }

  function onSubmit(data: ReviewFormData) {
    submitReview(
      { orderId: orderId ?? "", rating: data.rating, comment: data.comment },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully!");
          onSuccess?.();
        },
        onError: (err: unknown) => {
          const message = err instanceof Error ? err.message : "Failed to submit review";
          toast.error(message);
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Star rating */}
      <div>
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">
          Your Rating
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setValue("rating", star, { shouldValidate: true })}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <span
                className={cn(
                  "material-symbols-outlined text-3xl transition-colors",
                  star <= (hovered || rating)
                    ? "text-amber-400"
                    : "text-slate-300 dark:text-slate-600"
                )}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-xs text-red-500 mt-1">{errors.rating.message}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
          Comment (optional)
        </label>
        <textarea
          {...register("comment")}
          rows={3}
          placeholder="Share your experience with this farmer..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
        />
        {errors.comment && (
          <p className="text-xs text-red-500 mt-1">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || rating === 0}
        className="w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-60 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        {isPending && (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}
        Submit Review
      </button>
    </form>
  );
}
