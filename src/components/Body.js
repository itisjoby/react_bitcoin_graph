import React,{useState} from 'react';
import Chart from './Chart.js'
import Search from './Search.js'

function Body(){
    let [FromDate,SetFromDate]=useState('2020-01-01');
    let [ToDate,SetToDate]=useState('2021-03-21');
    let [Currency,SetCurrency]=useState('usd');
    function getFromDate(value){
        
        SetFromDate(value)
    }
    function getToDate(value){
        
        SetToDate(value)
    }
    function getCurrency(value){
        
        SetCurrency(value)
    }

    return (
<div>
    <Search getCurrency={getCurrency} Currency={Currency} getToDate={getToDate} getFromDate={getFromDate} FromDate={FromDate} ToDate={ToDate}/>
    <Chart FromDate={FromDate} ToDate={ToDate} Currency={Currency}/>
</div>
    )
}
//https://exchangeratesapi.io/
//https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01
export default Body;