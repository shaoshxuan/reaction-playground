import { Routes, Route } from "react-router-dom";
import HomePage from "../components/home-page/HomePage";
import ClassicColourChange from "./classic-colour-change/ClassicColourChange";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/classic-colour-change" element={<ClassicColourChange />}></Route>
        </Routes>
    )
}

export default AppRoutes;