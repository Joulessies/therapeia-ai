export const metadata = {
  title: "Therapy - Therapeia AI",
  description: "AI-powered therapy sessions and mental health support",
};

export default function TherapyLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      {children}
    </div>
  );
}
