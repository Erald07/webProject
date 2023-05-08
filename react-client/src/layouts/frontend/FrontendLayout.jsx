import React from "react";
import Navbar from '../../layouts/frontend/Navbar';
import { Routes, Route } from 'react-router-dom';
import publicrouteslist from "../../routes/PublicRouteList";

const FrontendLayout = () => {

    return(
        <div className="flex-col">
            <Navbar />
            <div>
                <div>
                    <Routes>
                        {publicrouteslist.map((routeData, idx) => {
                            return(
                                routeData.component && (
                                    <Route
                                        key={idx}
                                        path={routeData.path}
                                        element={<routeData.component />}
                                    />
                                )
                            );
                        })}
                    </Routes>
                </div>
            </div>
        </div>
    );

}

export default FrontendLayout;
