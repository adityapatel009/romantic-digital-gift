"use client";
import { useRouter } from "next/navigation";

export default function PayButton() {
  const router = useRouter();

  const payNow = async () => {
    const res = await fetch("/api/payment/create-order", { method: "POST" });
    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Romantic Digital Gift",
      description: "Unlock your gift",
      order_id: order.id,
      handler: async (response: any) => {
        const verify = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const result = await verify.json();
       if (result.success) {
  router.push(`/create/success?giftId=${result.giftId}`);
}

        else alert("Payment verification failed");
      },
      theme: { color: "#ec4899" },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={payNow}
      className="block w-full mt-8 py-4 rounded-full text-white
                 bg-gradient-to-r from-pink-500 to-purple-500"
    >
      Pay & Unlock →
    </button>
  );
}
