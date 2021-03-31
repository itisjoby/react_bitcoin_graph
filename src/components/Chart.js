import React, { useRef, useLayoutEffect,useEffect,useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Chart(props) {
  const chart = useRef(null);
  
  let [FromDate,SetFromDate]=useState(props.FromDate);
  let [ToDate,SetToDate]=useState(props.ToDate)
  let [Currency,SetCurrency]=useState(props.Currency)
  let [BitcoinData,SetBitcoinData]=useState([]);
 
 
  
  
let validated=false;
  let from_date_year=parseInt(props.FromDate.split("-")[0]);
  if(from_date_year>2010 && from_date_year<=2022){
    validated=true;
  }else{
    validated=false;
  }
  let to_date_year=parseInt(props.ToDate.split("-")[0]);
  if(validated && to_date_year>2010 && to_date_year<=2022){
    validated=true;
  }else{
    validated=false;
  }

  if(validated){
    console.log(validated)
    console.log(from_date_year);
    if(FromDate!=props.FromDate){
      SetFromDate(props.FromDate);
    }
    if(ToDate!=props.ToDate){
      SetToDate(props.ToDate)
    }
    if(Currency!=props.Currency){
      SetCurrency(props.Currency)
    }
  }

   
  
  
    useEffect(
        () => {

          let url='https://api.coindesk.com/v1/bpi/historical/close.json?start='+FromDate+'&end='+ToDate+'&currency='+Currency;
          
          fetch(url)
            .then(response => response.json())
            .then(data => {
               
                SetBitcoinData(data)
                
            });
        },
        [FromDate,ToDate,Currency]
    );

    

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    let data = [];

    if(BitcoinData){
        for(let coin_data in BitcoinData){
            if(coin_data='bpi'){
                
                for(let date in BitcoinData[coin_data]){
                    let value=BitcoinData[coin_data][date];
                    data.push({ date: new Date(date), name: "name", value: value });
                }

            }
            
        }
    }

    

    
    
    x.data = data;
    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [BitcoinData]);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}
export default Chart;