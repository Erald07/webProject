import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import './Style.css';
function ViewCategory()
{
    const[loading, setLoading] = useState(true);
    const[category, setCategory] = useState([]);
    useEffect(() => {

        let isMounted = true;
        axios.get('/api/getCategory').then(res=>{
            if(isMounted)
            {
                if(res.data.status ===200)
                {
                    setCategory(res.data.category);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false;
        }
    });

    if(loading)
    {
        return  <div className="loader"></div>
    }
    else
    {
        var showCategoryList = '';
        showCategoryList = category.map( (category, idx) => {
            return (
                <div className="flex w-1/4" key={idx}>
                    <div className="flex-col w-full px-2">
                        <Link to={`${category.slug}`}>
                            <img src={`http://localhost:8000/${category.photo}`} className="w-full h-80 bg-slate-100 px-2 py-2" alt={category.name} />
                        </Link>
                        <div className="py-3 px-4">
                            <Link to={`${category.slug}`}>
                                <h5 className="uppercase font-bold text-ellipsis">{category.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="bg-white">
            <div className="container">
                <div className="py-12">
                    <div className="py-3 flex flex-wrap">
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCategory;