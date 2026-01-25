import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { BookProvider } from "./context/BookContext";

const App = () => (
  <Router>
    <ErrorBoundary>
      <BookProvider>
        <AppLayout />
      </BookProvider>
    </ErrorBoundary>
  </Router>
);

export default App;
