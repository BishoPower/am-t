"use client";

import React from "react";

// Props interface matching the original CreateReview component
interface CreateReviewWrapperProps {
  isOpen?: boolean;
  onClose?: () => void;
  revieweeId: string;
  revieweeName?: string;
  revieweeUsername?: string;
  listingId?: string;
  listingTitle?: string;
  tradeId?: string;
  onReviewCreated?: () => void;
  onReviewSubmitted?: () => void;
  onCancel?: () => void;
}

/**
 * Wrapper component for CreateReview to resolve module import issues
 * This ensures proper React component mounting and prevents runtime errors
 */
const CreateReviewWrapper: React.FC<CreateReviewWrapperProps> = (props) => {
  // Dynamic import to resolve component loading issues
  const [CreateReview, setCreateReview] =
    React.useState<React.ComponentType<any> | null>(null);

  React.useEffect(() => {
    const loadComponent = async () => {
      try {
        const { default: Component } = await import("./CreateReview");
        setCreateReview(() => Component);
      } catch (error) {
        console.error("Failed to load CreateReview component:", error);
      }
    };

    loadComponent();
  }, []);

  if (!CreateReview) {
    return null; // or a loading spinner
  }

  return <CreateReview {...props} />;
};

CreateReviewWrapper.displayName = "CreateReviewWrapper";

export default CreateReviewWrapper;
