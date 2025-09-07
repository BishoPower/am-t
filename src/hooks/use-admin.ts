import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function useIsAdmin() {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isLoaded || !user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        // Use the debug endpoint for more detailed error information
        const response = await fetch(`/api/debug/admin-status`);
        if (response.ok) {
          const userData = await response.json();
          console.log("Admin status check:", userData); // Debug log
          setIsAdmin(userData.isAdmin || false);
        } else {
          console.error(
            "Failed to check admin status:",
            response.status,
            response.statusText
          );
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, isLoaded]);

  return { isAdmin, isLoading: isLoading || !isLoaded };
}
