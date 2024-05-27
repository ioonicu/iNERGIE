import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './ParetoChart.css';

Chart.register(...registerables);

const ParetoChart = ({ pannes }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const panneCounts = pannes.reduce((acc, panne) => {
            acc[panne.type] = (acc[panne.type] || 0) + 1;
            return acc;
        }, {});
        const sortedPannes = Object.entries(panneCounts).sort(([, a], [, b]) => b - a);
        const labels = sortedPannes.map(([type]) => type);
        const data = sortedPannes.map(([, count]) => count);
        const cumulativeData = data.reduce((acc, val) => {
            const lastValue = acc.length ? acc[acc.length - 1] : 0;
            acc.push(lastValue + val);
            return acc;
        }, []);
        const cumulativePercentages = cumulativeData.map(value => (value / cumulativeData[cumulativeData.length - 1]) * 100);

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Nombre de pannes',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        yAxisID: 'y-axis-count',
                    },
                    {
                        label: 'Pourcentage cumulatif',
                        data: cumulativePercentages,
                        type: 'line',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        yAxisID: 'y-axis-percentage',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    'y-axis-count': {
                        type: 'linear',
                        position: 'left',
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre de pannes'
                        }
                    },
                    'y-axis-percentage': {
                        type: 'linear',
                        position: 'right',
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Pourcentage cumulatif'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });

        // Cleanup on component unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [pannes]);

    return (
        <div className="chart-container">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default ParetoChart;
