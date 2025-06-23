import { useState, useEffect } from "react";

export function useReviewsCount(userId: string) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewsCount = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/reviews?revieweeId=${userId}`);

        if (response.ok) {
          const reviews = await response.json();
          if (Array.isArray(reviews)) {
            setCount(reviews.length);
          } else {
            setCount(0);
          }
        } else {
          setCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch reviews count:", error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsCount();
  }, [userId]);

  return { count, loading };
}
