import "../styles/globals.css";
import "../styles/details.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wrapper } from "../store/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);

  return process.browser ? (
    <>
      <ToastContainer position="top-right" limit={1}  toastStyle={{ backgroundColor: "crimson" }} />
      <PersistGate persistor={store.__persistor} >
        <Component {...pageProps} />
      </PersistGate>
    </>
  ) : (
    <>
      <ToastContainer position="top-right" limit={1} />

      <PersistGate persistor={store}>
        <Component {...pageProps} />
      </PersistGate>
    </>
  );
}

export default wrapper.withRedux(MyApp);
