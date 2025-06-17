import Spinner from "@/components/global/loader/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Spinner size={128} color="#000000" />
        </div>
      </div>
    </div>
  );
}
