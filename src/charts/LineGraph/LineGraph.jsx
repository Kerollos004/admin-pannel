import { Line } from "react-chartjs-2";
import {
    Chart as chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { faker } from "@faker-js/faker";
import React, { useMemo } from "react";

chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
responsive: true,
plugins: {
    legend: { position: "top" },
    title: { display: true, text: "sales flow chart" }
}
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function LineGraph() {
const data = useMemo(() => {
    return {
        labels,
        datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() =>
            faker.number.int({ min: 0, max: 100 })
        ),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        },
        {
            label: "Dataset 2",
            data: labels.map(() =>
            faker.number.int({ min: 0, max: 100 })
        ),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)"
        }
    ]
    };
}, []);

return (
        <Line options={options} data={data} />
);
}
