// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ sumCredits }) => {
    const total = 156;
    const data = {
        labels: ['Hoàn thành', 'Còn lại'],
        datasets: [
            {
                data: [sumCredits, total - sumCredits],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw} tín chỉ`;
                    },
                },
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;
