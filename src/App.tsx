import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import { BookProvider } from "./context/BookContext";

const App = () => (
  <Router>
    <BookProvider>
      <AppLayout />
    </BookProvider>
  </Router>
);

export default App;
