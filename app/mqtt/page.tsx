// ./app/mqtt/page.tsx
'use client'

import { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { ProgressRing } from 'progress-ring-component-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataPoints {
  timestamp: Date;
  chartTemp: number;
  chartDis: number;
  chartTurbd: number;
}

const DataPage: React.FC = () => {    
  const [selectedDataKey, setSelectedDataKey] = useState<'chartTemp' | 'chartDis' | 'chartTurbd'>('chartTemp');
  const [chartData, setChartData] = useState<DataPoints[]>([]);
  const [temperature, setTemperature] = useState<any>(0);
  const [distance, setDistance] = useState(0);
  const [turbidity, setTurbidity] = useState(0);
  const [date, setDate] = useState<String | null>(null);
  const [currentTimestamp, setCurrentTimestamp] = useState<String | number | null>(null);
    
  

  const brokerURI = "wss://broker.hivemq.com:8884/mqtt";
  const username = "leledumbo";
  const password = "";
  const clientOptions = {
    username,
    password,
    clientID: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentDate = new Date();
  //     const formattedDate = currentDate.toLocaleString("en-US", {
  //       weekday: "long",
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //       timeZoneName: "short",
  //     });
  
  //     setDate(formattedDate);
  //   }, 1000);
  
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [date]);
  
  useEffect(() => {
      
    const mqttClient = mqtt.connect(brokerURI, clientOptions);  

        mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe("lele-dumbo-temp")            
      mqttClient.subscribe("lele-dumbo-dis")            
      mqttClient.subscribe("lele-dumbo-turbd")            
    });
    
    mqttClient.on("reconnect", () => {
      console.log("reconnecting...")
    });

    mqttClient.on("message", (topic, message) => {
      console.log(message);
      const logDate = new Date(Date.now()).toLocaleString();
      console.log(logDate);
      setCurrentTimestamp(logDate);

      if (topic === "lele-dumbo-temp") {      
        setTemperature(parseFloat(message.toString()));  
      };

      if (topic === "lele-dumbo-dis") {        
        setDistance(parseFloat(message.toString()));
      };
      
      if (topic === "lele-dumbo-turbd") {
        // const turbd = JSON.parse(message.toString());
        setTurbidity(parseFloat(message.toString()));
      };
      
      setChartData((previousData) => [
        ...previousData,
        { timestamp: new Date(), chartTemp: temperature, chartDis: distance, chartTurbd: turbidity },
      ]);

      console.log(chartData);
      

    });

    mqttClient.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });  

    return () => {
      mqttClient.end()
    }

    
  }, []);

  

  
  const colors: Map<number, string> = new Map([[0, "#00e1ff"], [25, "#00d3ab"], [32, "#bd8a00"], [50, "#b10000"], [75, "#ff0000"]]);
  const turbidColors: Map<number, string> = new Map([[0, "#00e1ff"], [2.5, "#14c8f9"], [6.25, "#2cbbf4"], [12.5, "#756dad"], [25, "#7a477b"], [50, "#6c2747"] ,[100, "#440808"]]);  
  const turbidityProgress = ( turbidity / 40);  
  const degrees = Math.floor(temperature);
  return (
    <div className="mt-20">        

      <div className='flex flex-row justify-center gap-20'>
        {/* <LineChart width={400} height={400} data={sensorData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart> */}                                
        <div className='text-center'>
          <h1 className='mb-3'> Temperatur Air </h1>  
          <ProgressRing percentage={temperature} colors={colors}/>          
          <p>{`${temperature}°C`}</p>          
        </div>
        
        <div className='text-center'>
          <h1 className='mb-3'> Ketinggian Air </h1>  
          <ProgressRing percentage={distance} />
          <br />
          <p>{distance} cm</p>
        </div>
        
        <div className='text-center'>
          <h1 className='mb-3'> Kekeruhan Air </h1>  
          <ProgressRing percentage={turbidityProgress} colors={turbidColors} />
          <br/>
          <p>{turbidity} NTU</p>
        </div>    
        
      </div>            
      
      <br></br>
      <br></br>
      <br></br>
      <p className='text-center'>Last Update : {currentTimestamp}</p>
      {/* <p>{date}</p>                               */}
      
      {/* <LineChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid stroke="#ccc" />     
        <XAxis dataKey="timestamp"/>   
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="chartTemp" stroke="#8884d8" />
      </LineChart> */}

      {/* <LineChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid stroke="#ccc" />        
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="chartDis" stroke="#8884d8" />
      </LineChart>

      <LineChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid stroke="#ccc" />        
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="chartTurbd" stroke="#8884d8" />
      </LineChart> */}

    </div>
  );
};

export default DataPage;
