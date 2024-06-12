"use client";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Table } from 'antd';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Legend,
    Tooltip
);

const LineChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => setChartData(data));
    }, []);

    const options = {
        scales: {
            x: {
                grid: {
                    display: false, 
                },
                ticks: {
                    font: {
                        weight: 'bold',
                    },
                },
            },
            'y-axis-left': {
                type: 'linear',
                position: 'left',
                grid: {
                    display: true,
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1000, 
                    min: 0, 
                    font: {
                        weight: 'bold',
                    },
                },
            },
            'y-axis-right': {
                type: 'linear',
                position: 'right',
                grid: {
                    display: false, 
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 5, 
                    min: 0, 
                    callback: function(value) {
                        return value + "%";
                    },
                    font: {
                        weight: 'bold',
                    },
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };

    if (!chartData) {
        return <div>Loading...</div>;
    }

    const columns = [
        { title: '', dataIndex: 'type', key: 'type' },
        ...chartData.labels.map((label, index) => ({
            title: label,
            dataIndex: `month${index}`,
            key: `month${index}`,
        })),
    ];

    const dataSource = [
        {
            key: '1',
            type: 'Xe oto bán được',
            ...chartData.datasets[0].data.reduce((acc, val, index) => ({ ...acc, [`month${index}`]: val }), {}),
        },
        {
            key: '2',
            type: 'Xe máy bán được',
            ...chartData.datasets[1].data.reduce((acc, val, index) => ({ ...acc, [`month${index}`]: val }), {}),
        },
        {
            key: '3',
            type: 'Tỉ lệ xe bán được trong cả năm',
            ...chartData.datasets[2].data.reduce((acc, val, index) => ({ ...acc, [`month${index}`]: `${val}%` }), {}),
        },
    ];

    return (
        <div>
            <Chart style={{width: "70vw", margin: "0 auto"}} data={chartData} options={options} />
            <Table style={{width: "70vw", margin: "0 auto"}} columns={columns} dataSource={dataSource} pagination={false} />
        </div>
    );
};

export default LineChart;