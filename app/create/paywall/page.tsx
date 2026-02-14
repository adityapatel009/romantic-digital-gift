import PayButton from "@/components/paywall/PayButton";
import { PRICING } from "@/lib/pricing";

export default function PaywallPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-center">
          Unlock Your Gift ❤️
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Make this moment unforgettable
        </p>

        <div className="mt-6 text-center">
          <p className="text-3xl font-bold">₹{PRICING.amount}</p>
          <p className="text-sm text-gray-500">{PRICING.label}</p>
        </div>

        <ul className="mt-6 space-y-2 text-gray-700">
          {PRICING.features.map((f) => (
            <li key={f}>✅ {f}</li>
          ))}
        </ul>

        {/* REAL PAYMENT BUTTON */}
        <PayButton />

        <p className="mt-4 text-xs text-gray-400 text-center">
          Secure one-time payment (Test mode)
        </p>
      </div>
    </main>
  );
}
