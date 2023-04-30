import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
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
                    console.log(res.data.category);
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
        return  <h4>Loading Categories...</h4>
    }
    else
    {
        var showCategoryList = '';
        showCategoryList = category.map( (item, idx) => {
            return (
                <div className="flex w-1/4 px-3" key={idx}>
                    <div className="flex-col">
                        <Link to={`${item.slug}`}>
                            <img src="https://media.wired.com/photos/63f00cfbde5e9cf54ad7754a/4:3/w_1536,h_1152,c_limit/Best-Android-Phones-2023-Featured-2023.jpg" className="w-full" alt={item.name} />
                        </Link>
                        <div className="py-3">
                            <Link to={`${item.slug}`}>
                                <h5 className="uppercase font-bold text-ellipsis">{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="bg-gray-100">
            <div className="container">
                <div className="py-12">
                    <div className="py-3 flex">
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCategory;