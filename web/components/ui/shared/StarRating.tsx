interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

export default function StarRating({ rating, reviewCount, size = 'sm' }: StarRatingProps) {
  const iconSize = size === 'sm' ? 'text-sm' : 'text-base';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center gap-1">
      <span className={`material-symbols-outlined fill-1 text-accent-amber ${iconSize}`}>star</span>
      <span className={`font-semibold text-slate-700 ${textSize}`}>{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className={`text-text-muted ${textSize}`}>({reviewCount})</span>
      )}
    </div>
  );
}
