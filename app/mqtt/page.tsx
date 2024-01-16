'use client' // Gunakan client karena mqtt

// import dependencies
import { useEffect, useState } from 'react'; 
import mqtt from 'mqtt';
import { postSensorData } from '../lib/data';

// import komponen ui
import { ProgressRing } from 'progress-ring-component-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Pi } from 'lucide-react';
import { sensorData } from '../lib/definition';


// deklarasi type
interface DataPoints {
  timestamp: Date;
  chartTemp: number;
  chartDis: number;
  chartTurbd: number;
  chartVol: number;
}

// page
const DataPage: React.FC = () => {      

  // inisialisasi variable state 
  const [chartData, setChartData] = useState<DataPoints[]>([]);
  const [temperature, setTemperature] = useState<any>(0);
  const [distance, setDistance] = useState(0);
  const [turbidity, setTurbidity] = useState(0);  
  const [volume, setVolume] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState<String | number | null>(null);
    
  // config MQTT client
  const brokerURI = "wss://broker.hivemq.com:8884/mqtt";
  const username = "leledumbo";
  const password = "";
  const clientOptions = {
    username,
    password,
    clientID: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
  };

  // jalankan setiap state berubah  
  useEffect(() => {        

    const mqttClient = mqtt.connect(brokerURI, clientOptions);  

    // saat connect, sub
    // log dapat diakses pada console browser
    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe("lele-dumbo-temp");            
      mqttClient.subscribe("lele-dumbo-dis");            
      mqttClient.subscribe("lele-dumbo-turbd");            
    });
    
    mqttClient.on("reconnect", () => {
      console.log("reconnecting...");
    });

    // saat menerima pesan, lakukan logic berikut
    mqttClient.on("message", (topic, message) => {
      console.log(message);
      const logDate = new Date(Date.now()).toLocaleString();
      console.log(logDate);
      setCurrentTimestamp(logDate); //dapatkan timestamp saat msg diterima
  
      // update state sesuai topic
      if (topic === "lele-dumbo-temp") {      
        setTemperature(parseFloat(message.toString()));  
      };

      if (topic === "lele-dumbo-dis") {            
        setDistance(parseFloat(message.toString()));
        const calcVolume = 100 - distance * 3.14;
        setVolume(calcVolume);
      };
      
      if (topic === "lele-dumbo-turbd") {        
        setTurbidity(parseFloat(message.toString()));
      };                        

      // update chart data
      // karena behavior state dari react
      // perlu message dua kali, agar chart terupdate
      setChartData((previousData) => [
        ...previousData,
        { timestamp: new Date(Date.now()), chartTemp: temperature, chartDis: distance, chartTurbd: turbidity, chartVol: volume, },
      ]);                                    
         
      const dataToSave: sensorData = {              
        temperature,
        distance,
        turbidity,
        volume,
        timestamp: new Date(Date.now()),
      };
  
      postSensorData(dataToSave);
      
    });    
    
    mqttClient.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });      

    

    // cleanup
    return () => {      
      mqttClient.end()
    }

    
  }, [chartData, temperature, distance, turbidity]); // dependency array

  // cek chartdata
  // useEffect(() => {
  //   console.log("Updated chartData:", chartData);
  // }, [chartData]);  
  
  // map warna progress ring
  const colors: Map<number, string> = 
    new Map([
      [0, "#00e1ff"], [25, "#00d3ab"], [32, "#bd8a00"], [50, "#b10000"], [75, "#ff0000"]
    ]);
  const turbidColors: Map<number, string> = 
    new Map([
      [0, "#00e1ff"], [2.5, "#14c8f9"], [6.25, "#2cbbf4"], [12.5, "#756dad"], [25, "#7a477b"], [50, "#6c2747"] ,[100, "#440808"]
    ]);  

  // value percentage progress ring
  const turbidityProgress = ( turbidity / 40);  
  const disPercnt = (distance/6)

  return (
    <div className="mt-10">        
      <div className='flex flex-row justify-center gap-20'>                                    
        <div className='text-center'>
          <h1 className='mb-3'> Temperatur Air </h1>  
          <ProgressRing percentage={temperature} colors={colors}/>          
          <p>{`${temperature}°C`}</p>          
        </div>
        
        <div className='text-center'>
          <h1 className='mb-3'> Ketinggian Air </h1>  
          <ProgressRing percentage={disPercnt} />
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
            
      <p className='text-center mt-10'>Last Update : {currentTimestamp}</p>      
      
      <div className='flex flex-row justify-center gap-20'>    
        <LineChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid stroke="#ccc" />     
          <XAxis dataKey="timestamp"/>   
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="chartTemp" stroke="#8884d8" />
        </LineChart>

        <LineChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid stroke="#ccc" />        
          <XAxis dataKey="timestamp"/>  
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="chartDis" stroke="#8fdca9" />
        </LineChart>        
      </div>

      <div className='flex flex-row justify-center gap-20'>   
        <LineChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid stroke="#ccc" />        
          <XAxis dataKey="timestamp"/>  
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="chartTurbd" stroke="#e39588" />
        </LineChart>

        <LineChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid stroke="#ccc" />        
          <XAxis dataKey="timestamp"/>  
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="chartVol" stroke="#fff000" />
        </LineChart>
      </div>

    </div>
  );
};

export default DataPage;
