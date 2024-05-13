import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="content">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
