export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      {children}
    </section>
  );
}
