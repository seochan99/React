import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Products from './Products';
import ErrorBanner from '../../components/ErrorBanner';
import Options from './Options';

export default function Type({orderType}) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    useEffect(()=>{
        loadItems(orderType)
    },[orderType]);

    const loadItems = async(orderType)=>{
        try{
            let respons = await axios.get(`http://localhost:4000/${orderType}`)
            setItems(respons.data);
        }catch(error){
            setError(true)

        }
    }
    const ItemComponent = orderType === "products" ? Products : Options ;
    const optionItems = items.map((item)=>(
        //map에는 Key필수 
        <ItemComponent 
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        />
    ));

    if(error){
        return <ErrorBanner message="에러가 발생했습니다." />

    }
    
  return <div>{optionItems}</div>
}
