import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-1/4 min-h-screen">
            <div className="py-5 px-4">
                <div className="flex-col">
                    <div className="py-2 flex">
                        <Link to={'/admin/dashboard'}>Dashboard</Link>
                    </div>
                    <div className="py-2 flex">
                        <Link to={'/admin/products'}>Products</Link>
                    </div>
                    <div className="py-2 flex">
                        <Link to={'/admin/add-product'}>Add Product</Link>
                    </div>
                    <div className="py-2 flex">
                        <Link to={'/admin/view-category'}>View Category</Link>
                    </div>
                    <div className="py-2 flex">
                        <Link to={'/admin/add-category'}>Add Category</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;