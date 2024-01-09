import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataPoints {
  timestamp: Date;
  chartTemp: number;
  chartDis: number;
  chartTurbd: number;
}

interface ChartProps {
  data: DataPoints[];
}

const SensorLineChart: React.FC<ChartProps> = ({ data }: ChartProps) => {
  // const data = [
  //   { name: 'January', uv: 4000, pv: 2400, amt: 2400 },
  //   { name: 'February', uv: 3000, pv: 1398, amt: 2210 },
  //   { name: 'March', uv: 2000, pv: 9800, amt: 2290 },
  //   { name: 'April', uv: 2780, pv: 3908, amt: 2000 },
  //   { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  //   { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
  //   { name: 'July', uv: 3490, pv: 4300, amt: 2100 },
  // ];

  return (
    <div>
      <h2>Line Chart Example</h2>
      <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />        
      </LineChart>
    </div>
  );
};

export default SensorLineChart;
