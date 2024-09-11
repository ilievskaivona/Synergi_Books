import React from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/auth/LoginPage";
import SetNewPassword from "../views/auth/SetNewPassword";
import EmptyState from "../views/adminPanel/EmptyState"
import FirstTimeLogin from "../views/auth/FirstTimeLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "../views/auth/ForgotPassword";
import NotFound from "../views/404Page";
import Library from "../views/library/Library";
import ReviewMaterials from "../views/materialsForReview/ReviewMaterials";
import Review from "../views/library/Review";
import AdminPanel from "../views/adminPanel/AdminPanel";
import MyBooks from "../views/library/MyBooks";
import Editor from "../components/editor/Editor";

interface RouteInterface {
  path: string;
  component: JSX.Element;
}
// const user = localStorage.getItem("user");


const routes: RouteInterface[] = [
  { path: "/", component: <Home /> },
  { path: "/login", component: <Login /> },
  { path: "/first-login", component: <FirstTimeLogin /> },
  { path: "/new-password", component: <SetNewPassword /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/404", component: <NotFound /> },
  { path: "/empty-state", component: <EmptyState /> },
  { path: "/library", component: <Library /> },
  { path: "/review", component: <Review /> },
  { path: "/manage-users", component: <AdminPanel /> }, 
  { path: "/management/review-materials", component: <ReviewMaterials /> },
  { path: "/my-books", component: <MyBooks /> },
  { path: "/editor", component: <Editor /> },
];

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
