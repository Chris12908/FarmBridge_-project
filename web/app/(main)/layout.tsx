import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
