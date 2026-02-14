export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
      <div
        className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
        style={{ width: `${step * 20}%` }}
      />
    </div>
  );
}
