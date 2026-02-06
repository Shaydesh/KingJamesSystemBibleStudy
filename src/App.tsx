import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { BookProvider } from "./context/BookContext";
import UpdateToast from "./components/UpdateToast/UpdateToast";
import { useServiceWorkerUpdate } from "./hooks/useServiceWorkerUpdate";

const App = () => {
  const { updateAvailable, refresh, dismiss } = useServiceWorkerUpdate();

  return (
    <Router>
      <ErrorBoundary>
        <BookProvider>
          <AppLayout />
          {updateAvailable && (
            <UpdateToast onRefresh={refresh} onDismiss={dismiss} />
          )}
        </BookProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
