// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ selectedSemester }) => {
    if (!selectedSemester) {
        return <div>Vui lòng chọn học kỳ</div>;
    }

    const data = {
        labels: selectedSemester.grades.map((grade, index) => `Môn ${index + 1}`),
        datasets: [
            {
                label: 'Điểm',
                data: selectedSemester.grades.map(grade => grade.averageGrade),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: (tooltipItems) => {
                        return selectedSemester.grades[tooltipItems[0].dataIndex].courseName;
                    },
                    label: (tooltipItem) => {
                        return `Điểm: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
