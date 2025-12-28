import React,{useState} from 'react';
import'./searchForm.css';

const SeachForm=({onSearch})=>{
    const[searchCriteria,setSearchCriteria]=useState({
        type:'any',
        minprice:'',
        minBedrooms:'',
        maxBedrooms: '',
        dateFrom: '',
        dateTo: '',
        postcode: ''
  
    });
}