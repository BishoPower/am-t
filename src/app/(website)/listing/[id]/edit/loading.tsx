import Spinner from "@/components/global/loader/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size={128} color="#000000" />
      </div>
    </div>
  );
}
