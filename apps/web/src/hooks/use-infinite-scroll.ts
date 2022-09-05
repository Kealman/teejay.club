import { useCallback, useEffect } from "react";

export function useInfiniteScroll(
  isFetching: boolean,
  hasNextPage = false,
  fetchNextPage: () => void
) {
  const handleScroll = useCallback(() => {
    if (isFetching || !hasNextPage) {
      return;
    }

    const element = document.documentElement;
    if (element.scrollTop + element.clientHeight * 2 < element.scrollHeight) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
}
