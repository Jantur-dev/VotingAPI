import {Sidebar} from '@/Components'
import Chart from './Chart'

const MainChart = (dataX, dataY) => {
    return (
        <Sidebar page={<Chart dataX={dataX} dataY={dataY} />} />
    )
}

export default MainChart;