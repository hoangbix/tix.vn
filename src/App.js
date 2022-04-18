import { Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/login/Login";
import Admin from "./AdminLayout/pages/Admin";
import Navbar from "./AdminLayout/component/Navbar/Navbar";
import ListFilm from "./AdminLayout/component/ManageFilm/ListFilm";
import ManageUser from "./AdminLayout/component/ManageUser/ManageUser";
import AddFilm from "./AdminLayout/component/ManageFilm/AddFilm";
import EditFilm from "./AdminLayout/component/ManageFilm/EditFilm";
import AddShowtime from "./AdminLayout/component/ManageFilm/AddShowtime";
import Loading from "./components/Loading/Loading";

export const history = createBrowserHistory();

function App() {
  return (
    <>
      <Loading />
      <Routes history={history}>
        <Route path="/" element={<Home />}></Route>
        <Route path="detail/:id" element={<Detail />} />
        <Route path="checkout/:id" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route element={<Navbar />}>
          <Route path="admin" element={<Admin />}>
            <Route path="listfilm" element={<ListFilm />} />
            <Route path="addfilm" element={<AddFilm />} />
            <Route path="edit/:id" element={<EditFilm />} />
            <Route path="showtime/:id" element={<AddShowtime />} />
            <Route path="manageuser" element={<ManageUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
