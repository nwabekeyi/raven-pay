import CryptoChart from "../../trading-components/chart"
import OrderBookTable from "../../trading-components/orderBook"
import "./charts-tables.css"

const ChartTable = () =>{

    return(
        <div className="chart-table">
            <CryptoChart />
            <OrderBookTable />
        </div>
    )
}

export default ChartTable