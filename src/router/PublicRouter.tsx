import { Route, Routes } from "react-router";
import { Home, Login } from "../pages";


export const PublicRouter = () => {
  return (
    <Routes>
        <Route path="/" element={ <Login /> }/>
        <Route path="/home" element={ <Home /> }/>
    </Routes>
  );
};
