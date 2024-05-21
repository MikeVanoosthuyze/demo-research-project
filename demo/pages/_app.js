import "@/styles/globals.css";
import ViewTransition from "@/components/ViewTransition";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <ViewTransition>
      <Component {...pageProps} />
      <Footer />
    </ViewTransition>
  );
}
