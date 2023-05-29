import React, {useState} from 'react'
import RangeSlider from './RangeSlider'
import { useNavigate } from 'react-router-dom';

function FilterComponent() {

    const navigate = useNavigate();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(1000);

    // function handleChange(e){
    //     navigate(`?minPrice=${min}&maxPrice=${max}`)
    // }

    const handlePrice = (e, newParams1, newParams2) => {
        const existingQuery = new URLSearchParams(window.location.search);
        const newQuery = new URLSearchParams();

        if (existingQuery.has(newParams1, newParams2)) {
            existingQuery.set(newParams1, `${min}`);
            existingQuery.set(newParams2, `${max}`);
        } 
        else {
            existingQuery.append(newParams1, `${min}`);
            existingQuery.append(newParams2, `${max}`);
        }

        existingQuery.forEach((value, key) => {
            newQuery.append(key, value);
        });


        const newURL = `${window.location.pathname}?${newQuery.toString()}`;

        navigate(newURL);
    };

    return (
        <div className='absolute -translate-y-4'>
            <div className="w-[500px] pl-40">
                <div className="border border-gray-150 bg-gray-100">
                    <div className="py-4 px-6">
                        <h1 className='py-2 mb-2 text-xl font-semibold text-gray-600'>Filter by price</h1>
                        <RangeSlider
                            min={0}
                            max={4000}
                            onChange={({ min, max }) => {setMin(min); setMax(max);}}
                        />
                        <div className="mt-16">
                            <button onClick={(e) => handlePrice(e, 'minPrice', 'maxPrice')} className='bg-primary text-white px-8 py-2 text-base rounded-full'>Filtro</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterComponent