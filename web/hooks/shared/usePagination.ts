import { useState } from 'react';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/lib/constants';

export function usePagination(
  initialPage = DEFAULT_PAGE,
  initialLimit = DEFAULT_LIMIT
) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  function nextPage() {
    setPage((p) => p + 1);
  }

  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function reset() {
    setPage(initialPage);
    setLimit(initialLimit);
  }

  return { page, limit, setPage, setLimit, nextPage, prevPage, reset };
}
