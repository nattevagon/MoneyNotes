export default function MainLayout({ children }) {
  return (
    <main className="flex flex-col min-h-screen bg-[#141414] pt-[env(safe-area-inset-top)] pb-[98px]">
      {children}
    </main>
  );
}