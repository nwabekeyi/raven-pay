import Dropdown from "../../ui-components/dropdown";
import SegmentedControl from "../segmented-control";
import React, { useState, useEffect } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize
} from "react-financial-charts";

const CryptoChart = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState('1m');
  const [period, setPeriod] = useState('1d');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=YOUR_API_KEY`);
        const result = await response.json();

        if (result.Response === "Success") {
          const formattedData = result.Data.Data.map(d => ({
            date: new Date(d.time * 1000),
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
            volume: d.volumeto
          }));

          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [interval, period]);

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(d => new Date(d.date));
  const height = 700;
  const width = 900;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d, c) => { d.ema12 = c; })
    .accessor(d => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d, c) => { d.ema26 = c; })
    .accessor(d => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(data)));
  const { data: finalData, xScale, xAccessor, displayXAccessor } = ScaleProvider(calculatedData);
  const pricesDisplayFormat = format(".2f");
  const max = xAccessor(finalData[finalData.length - 1]);
  const min = xAccessor(finalData[Math.max(0, finalData.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;
  const elderRayHeight = 100;
  const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;
  const yExtents = d => [d.high, d.low];
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const barChartExtents = d => d.volume;
  const candleChartExtents = d => [d.high, d.low];
  const yEdgeIndicator = d => d.close;
  const volumeColor = d => d.close > d.open ? "rgba(38, 166, 154, 0.3)" : "rgba(239, 83, 80, 0.3)";
  const volumeSeries = d => d.volume;
  const openCloseColor = d => d.close > d.open ? "#26a69a" : "#ef5350";

  const intervals = ['1m', '5m', '1h'];
  const periods = ['1d', '7d', '30d'];

  return (
    <div className="crypto-chart">
      <h2 className="crypto-chart__header">Crypto Chart</h2>
      <div className="crypto-chart__controls">
      <SegmentedControl segments={intervals} onSegmentChange={setInterval} activeStyle="order" />
      <Dropdown label="Period" options={periods} onSelect={setPeriod} />
      </div>
      <ChartCanvas
        height={height}
        ratio={3}
        width={width}
        margin={margin}
        data={finalData}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
        style={{ backgroundColor: "#1e1e1e" }} // Dark background for the chart
      >
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
        >
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
          <XAxis showGridLines showTickLabel={false} stroke="#e0e0e0" tickStroke="#e0e0e0" />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} stroke="" tickStroke="#e0e0e0" />
          <CandlestickSeries fill={d => (d.close > d.open ? "#26a69a" : "#ef5350")} stroke="" />
          <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
          <CurrentCoordinate
            yAccessor={ema26.accessor()}
            fillStyle={ema26.stroke()}
          />
          <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
          <CurrentCoordinate
            yAccessor={ema12.accessor()}
            fillStyle={ema12.stroke()}
          />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
            fill="#1e1e1e" stroke="#e0e0e0"
          />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: "EMA",
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize
              },
              {
                yAccessor: ema12.accessor(),
                type: "EMA",
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize
              }
            ]}
            textFill="#e0e0e0" // Text color for the tooltip
          />
          <ZoomButtons fill="#1e1e1e" stroke="#e0e0e0" />
          <OHLCTooltip origin={[8, 16]} textFill="#e0e0e0" />
        </Chart>
        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#444" tickStroke="#e0e0e0" />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} stroke="#e0e0e0" tickStroke="#e0e0e0" />
          <MouseCoordinateX displayFormat={timeDisplayFormat} fill="#1e1e1e" stroke="#e0e0e0" />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
            fill="#1e1e1e" stroke="#e0e0e0"
          />
          <ElderRaySeries yAccessor={elder.accessor()} fillStyle={{bullPower: "#26a69a", bearPower: "#ef5350"}} />
          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={d =>
              `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                d.bearPower
              )}`
            }
            origin={[8, 16]}
            textFill="#e0e0e0"
          />
        </Chart>
        <CrossHairCursor stroke="#e0e0e0" />
      </ChartCanvas>
    </div>
  );
};

export default CryptoChart;
