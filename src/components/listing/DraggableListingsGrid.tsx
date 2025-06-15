"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
  SortableContext as SortableContextType,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ListingCard from "@/components/listing/ListingCard";
import { toast } from "@/hooks/use-toast";

interface DraggableListingCardProps {
  listing: any;
  showPrivateIndicator?: boolean;
  showEditOptions?: boolean;
}

const DraggableListingCard: React.FC<DraggableListingCardProps> = ({
  listing,
  showPrivateIndicator,
  showEditOptions,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: listing.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <ListingCard
        listing={listing}
        showPrivateIndicator={showPrivateIndicator}
        showEditOptions={showEditOptions}
      />
    </div>
  );
};

interface DraggableListingsGridProps {
  listings: any[];
  showPrivateIndicator?: boolean;
  showEditOptions?: boolean;
  onReorder?: (newOrder: string[]) => void;
}

const DraggableListingsGrid: React.FC<DraggableListingsGridProps> = ({
  listings: initialListings,
  showPrivateIndicator = false,
  showEditOptions = false,
  onReorder,
}) => {
  const [listings, setListings] = useState(initialListings);
  const [isReordering, setIsReordering] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      console.log("Drag detected, setting hasUnsavedChanges to true");
      setHasUnsavedChanges(true);

      setListings((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Call the reorder callback with the new order
        if (onReorder) {
          const newOrder = newItems.map((item) => item.id);
          onReorder(newOrder);
        }

        return newItems;
      });
    }
  };
  const saveOrder = async () => {
    setIsReordering(true);
    try {
      const listingIds = listings.map((listing) => listing.id);

      const response = await fetch("/api/listings/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }
      toast({
        title: "Order saved!",
        description: "Your listing order has been updated.",
      });

      // Clear unsaved changes flag to hide the button
      console.log("Save completed, setting hasUnsavedChanges to false");
      setHasUnsavedChanges(false);

      // Reload the page to refresh the state
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Wait 1 second to show the toast
    } catch (error) {
      console.error("Error saving order:", error);
      toast({
        title: "Error",
        description: "Failed to save the new order. Please try again.",
        variant: "destructive",
      });
      setIsReordering(false);
    }
  };
  console.log("hasUnsavedChanges:", hasUnsavedChanges);

  return (
    <div className="space-y-4">
      {hasUnsavedChanges && (
        <div className="flex justify-end">
          <button
            onClick={saveOrder}
            disabled={isReordering}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isReordering ? "Saving..." : "Save Order"}
          </button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={listings} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {listings.map((listing) => (
              <DraggableListingCard
                key={listing.id}
                listing={listing}
                showPrivateIndicator={showPrivateIndicator}
                showEditOptions={showEditOptions}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DraggableListingsGrid;
