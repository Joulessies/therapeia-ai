export const metadata = {
  title: "Wellness - Therapeia AI",
  description:
    "Mental wellness tools including mood tracking, meditation, and journaling",
};

export default function WellnessLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
      {children}
    </div>
  );
}
