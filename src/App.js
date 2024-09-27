import { useEffect, useState, useMemo } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Transaction from "./components/Transaction/Transaction";
import Payout from "./components/Payload/Payout";
import { useAllProduct } from "./api-context/commonApiContext";
import Statement from "./components/Statement/Statement";

function App() {
  const { clientData } = useAllProduct();
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  // const [data, setData] = useState(null);


  // const [selectedCompanyName, setSelectedCompanyName] = useState("");
  // const [selectedEscrowVal, setSelectedEscrowVal] = useState("");
  // const [filterCompanyName, setFilterCompanyName] = useState("");
  // const [selectedEscrowName, setSelectedEscrowName] = useState("");

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home";
        metaDescription = "Welcome to the home page";
        break;
      // Add other routes as needed
    }

    if (title) document.title = title;
    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) metaDescriptionTag.content = metaDescription;
    }
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/transaction"
        element={<Transaction /* clientData={clientData} */ />}
      />
      <Route
        path="/payout"
        element={
          <Payout
          // clientData={data}
          // setSelectedCompanyName={setSelectedCompanyName}
          // selectedEscrowVal={selectedEscrowVal}
          // setSelectedEscrowName={setSelectedEscrowName}
          // selectedCompanyName={selectedCompanyName}
          // filterCompanyName={filterCompanyName}
          // selectedEscrowName={selectedEscrowName}
          />
        }
      />
      <Route path="/statement" element={<Statement />} />
    </Routes>
  );
}

export default App;
