import { useState, useEffect } from 'react';


function Search(props){

    
    
    
    return (
    <div>
        <input type="date" value={props.FromDate} onChange={(e)=>{props.getFromDate(e.target.value)}}/> to  
        <input type="date" value={props.ToDate} onChange={(e)=>{props.getToDate(e.target.value)}}/>
        <select onChange={(e)=>{props.getCurrency(e.target.value)}} value={props.Currency}>
            <option value="inr">inr</option>
            <option value="usd">usd</option>
            <option value="eur">eur</option>
            <option value="gbp">gbp</option>
        </select>
    </div>
    )
}

export default Search;