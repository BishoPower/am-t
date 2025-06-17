import { Suspense } from "react";
import EditListing from "@/components/listing/EditListing";
import { notFound } from "next/navigation";
import Spinner from "@/components/global/loader/spinner";

export default async function EditListingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // Validate UUID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!id || !uuidRegex.test(id)) {
    return notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Spinner size={128} color="#000000" />
          </div>
        </div>
      }
    >
      <EditListing listingId={id} />
    </Suspense>
  );
}
