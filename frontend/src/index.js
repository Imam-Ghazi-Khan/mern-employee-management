import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import  ReactDOM  from 'react-dom/client';
import DashBoard from "./components/DashBoard/DashBoard";
import Login from "./components/Login/Login";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import CreateEmployee from "./components/CreateEmployee/CreateEmployee";
import EmployeeEdit from "./components/EmployeeEdit/EmployeeEdit";
import './index.css'
import Header from "./components/Header/Header";

const AppLayout = () => {

    return (
        <div className="app">
            <Header/>
            <Outlet />
        </div>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <DashBoard />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/employee-list",
                element: <EmployeeList />
            },
            {
                path: "/create-employee",
                element: <CreateEmployee />
            },
            {
                path: "/employee-edit/:id",
                element: < EmployeeEdit />
            },
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
