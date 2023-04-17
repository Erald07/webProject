import React from "react";
import Navbar from './Navbar';
import Sidebar from "./Sidebar";
import routes from "../../routes/routes";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
const MasterLayout = () => {

    return(
        <div className="flex-col">
            <Navbar />
            <div className="bg-gray-100">
                <div className="flex-wrap flex">
                    <Sidebar />
                    <div className="py-4 px-6">
                        <Routes>
                            {routes.map((route, idx) => {
                                return(
                                    route.component && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            element={<route.component />}
                                        />
                                    )
                                );
                            })}
                            <Route path="admin" element={<Navigate to="/admin/dashboard" replace />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MasterLayout;
