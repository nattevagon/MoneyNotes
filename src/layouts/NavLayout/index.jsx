import Navigation from "@/components/molecules/Navigation";

export default function NavLayout({ children }) {
  return (
    <>
      <main className="flex flex-col min-h-screen bg-[#141414] pt-[env(safe-area-inset-top)] pb-[98px]">
        {children}
      </main>
      <Navigation />
    </>
  );
}