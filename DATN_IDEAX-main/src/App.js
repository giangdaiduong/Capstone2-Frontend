import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import LayoutInvestor from "./HOC/LayoutInvestor";

import History from "./Pages/History/History";
import Community from "./Pages/Community/Community";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
            <HomePage/>
            }
          />

               <Route
            path="/lich-su"
            element={
              <LayoutInvestor title="Lịch sử quan tâm" decs="Lịch sử danh sách các ý tưởng bạn đã quan tâm">
                <History/>
              </LayoutInvestor>
            }
          />
               <Route
            path="/cong-dong"
            element={
              <LayoutInvestor title="Cộng đồng" decs="Cộng đồng nhà đầu tư">
                <Community/>
              </LayoutInvestor>
            }
          />
 

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
