"use client";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Admin — Orders</h1>

      <div className="overflow-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Gift ID</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Scheduled</th>
              <th className="p-2 border">Unlocked</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
  <tr key={o._id}>

                <td className="p-2 border">{o.orderId}</td>
                <td className="p-2 border">{o.giftId}</td>
                <td className="p-2 border">₹{o.amount}</td>
                <td className="p-2 border">
                  {o.scheduledAt
                    ? new Date(o.scheduledAt).toLocaleString()
                    : "Now"}
                </td>
                <td className="p-2 border">
                  {o.unlocked ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
