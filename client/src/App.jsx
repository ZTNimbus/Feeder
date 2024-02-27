import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import SurveyNew from "./components/SurveyNew";

import { dispatchFetchUser } from "./actions";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetch = async () => dispatchFetchUser();
    fetch();
  }, []);

  return (
    <main className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/surveys" element={<Dashboard />} />
            <Route path="/surveys/new" element={<SurveyNew />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
