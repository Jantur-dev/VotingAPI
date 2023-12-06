import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, 
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Chart = ({dataX, dataY}) => {
    console.log(dataX.dataY)
    const label = dataX.dataX;
    const options = {
        plugins: {
            display: false
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    }
    
    const data = {
        labels: label,
        datasets: [
            {
                label: "Data vote",
                backgroundColor: [
                    "#103783"
                ],
                data: dataX.dataY
            },
        ],
    };

    return <Bar options={options} data={data} />;
};

export default Chart;
