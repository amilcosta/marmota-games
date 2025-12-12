"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createChart, AreaSeries, ColorType, LineSeries } from 'lightweight-charts';

/*export const ChartComponent = ({ data }) => {
    const chartContainerRef = useRef();

    useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
    });

    const areaSeries = chart.addSeries(AreaSeries, { lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' });
    areaSeries.setData(data);

    // Optional: Handle window resize to adjust chart size
    const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove(); // Clean up the chart instance
    };
    }, [data]); // Re-run effect if data changes

    return <div ref={chartContainerRef}  />;
};*/

export const ChartComponent = props => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            lineColor2 = '#ff29e6ff',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();
    const tooltipRef = useRef();
    const [tooltipContent, setTooltipContent] = useState('');

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            for(const datalines of data.lines){
                let newSeries = chart.addSeries(LineSeries, {title: datalines.label,color: datalines.borderColor})
                newSeries.setData(datalines.data);

                /*chart.subscribeCrosshairMove(param => {
                if (param.point) {
                    const x = param.point.x;
                    const y = param.point.y;

                    // Get data at crosshair position
                    const datatool = param.seriesData.get(newSeries);
                    if (datatool) {
                    setTooltipContent(`Time: ${datatool.time}`);
                    
                    // Position tooltip
                    if (tooltipRef.current) {
                        tooltipRef.current.style.left = `${x}px`;
                        tooltipRef.current.style.top = `${y}px`;
                    }
                    }
                } else {
                    setTooltipContent(''); // Hide tooltip when no data
                }
                });*/
            }
            //const newSeries = chart.addSeries(LineSeries, {color: '#2962FF'})
            //newSeries.setData(data);
            //const newSeries2 = chart.addSeries(AreaSeries, { lineColor: '#ff29e6ff', topColor: '#ff29e6ff', bottomColor: areaBottomColor });
            //const newSeries2 = chart.addSeries(LineSeries, {color: '#ff29e6ff'})
            //newSeries2.setData(data2);

            

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        ></div>
    );
};