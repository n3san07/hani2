import "./App.css";
import "@fontsource/inter";
import Router from "./routes/Router";
import Layout from "./components/layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { AppThemePrvoider } from "./providers/Thems";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import UserDetailsContext from "./context/UserDetailsContext";
import { AddResidenceModal } from "./components/Residences/AddResidences/AddResidencesModel";
function App() {
  const queryClient = new QueryClient();

  const [UserDetails, setUserDetails] = useState(null);

  return (
    <>
      <UserDetailsContext.Provider value={{ UserDetails, setUserDetails }}>
        <AddResidenceModal>
          <QueryClientProvider client={queryClient}>
            <AppThemePrvoider>
              <BrowserRouter>
                <Layout>
                  <Router />
                </Layout>
              </BrowserRouter>
              <ToastContainer />
            </AppThemePrvoider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AddResidenceModal>
      </UserDetailsContext.Provider>
    </>
  );
}

export default App;
