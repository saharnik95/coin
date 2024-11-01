"use client";
import "@/module/core/styles/globals.css";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { ChartOptions, LegendItem } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TransactionChartComponentProps {
  name?: string;
  code?: string;
}

type TimePeriod = "24h" | "1w" | "1m" | "1y";

const timeLabels = {
  "24h": Array.from({ length: 24 }, (_, i) => `${(i + 19) % 24}:29`),
  "1w": [
    "sun",
    "mon",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ],
  "1m": Array.from({ length: 30 }, (_, i) => `${i + 1}`),
  "1y": [
    "Mar '23",
    "Apr '23",
    "May '23",
    "Jul '23",
    "Aug '23",
    "Sep '23",
    "Oct '23",
    "Nov '23",
    "Dec '23",
    "Jan '23",
    "Feb '23",
  ],
};

export default function TransactionChartComponent({
  name,
  code,
}: TransactionChartComponentProps = {}) {
  const [period, setPeriod] = React.useState<TimePeriod>("24h");
  const [currencyPrices, setCurrencyPrices] = React.useState<number[]>([]);
  const [usdPrices, setUsdPrices] = React.useState<number[]>([]);
  const [equality, setEquality] = React.useState<number[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://b.wallet.ir/coinlist/chart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ period: period, currency_code: code }),
        });
        const data = await response.json();
        setCurrencyPrices(data.items.map((item: any) => item.price));
        setUsdPrices(data.items.map((item: any) => item.usd_price));
        setEquality(data.items.map((item: any) => item.irt_price));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [code, period]);

  const chartData = {
    labels: timeLabels[period],
    datasets: [
      {
        label: "برابری",
        data: equality,
        borderColor: "rgba(22, 82, 240, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderWidth: 1,
        pointRadius: 0,
        fill: false,
      },
      {
        label: `قیمت ${name}`,
        data: currencyPrices,
        borderColor: "rgba(247, 147, 26, 1)",
        backgroundColor: "rgba(247, 147, 26, 0.2)",
        pointRadius: 0,
        borderWidth: 1,
        fill: true,
        yAxisID: "y1",
      },
    ],
  };

  const bottomChartData = {
    labels: timeLabels[period],
    datasets: [
      {
        label: "نرخ دلار",
        data: usdPrices,
        borderColor: "rgba(75, 181, 67, 1)",
        backgroundColor: "rgba(75, 181, 67, 0.2)",
        fill: true,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  const topChartOptions: ChartOptions<"line"> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: { display: false },
      legend: {
        position: "bottom",
        rtl: true,
        labels: {
          font: { family: "font-iran, sans-serif" },
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart: ChartJS): LegendItem[] => {
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => ({
              text: dataset.label || "", // Ensure text is a string, defaulting to an empty string if undefined
              fillStyle: dataset.borderColor as string,
              strokeStyle: dataset.borderColor as string,
              hidden: !chart.isDatasetVisible(i),
              datasetIndex: i,
            }));
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
      },
      y: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: true, drawTicks: true, display: true },
        ticks: {
          callback: (value) => (Number(value) / 1000000000).toFixed(3) + "M",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: { drawOnChartArea: false },
        ticks: {
          callback: (value) => (Number(value) / 1000).toFixed(0) + "k",
        },
      },
    },
  };

  const bottomChartOptions: ChartOptions<"line"> = {
    maintainAspectRatio: false, // Set this to false to allow custom height
    aspectRatio: 10,
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: { display: false },
      legend: {
        position: "bottom",
        rtl: true,
        labels: {
          font: { family: "font-iran, sans-serif" },
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart: ChartJS): LegendItem[] => {
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => ({
              text: dataset.label || "", // Ensure text is a string, defaulting to an empty string if undefined
              fillStyle: dataset.borderColor as string,
              strokeStyle: dataset.borderColor as string,
              hidden: !chart.isDatasetVisible(i),
              datasetIndex: i,
            }));
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "font-iran, sans-serif" } },
      },
      y: {
        type: "linear",
        display: true,
        position: "right",

        grid: {
          drawOnChartArea: true,
          drawTicks: false,
          display: true,
        },
        ticks: {
          callback: (value) => (Number(value) / 1000).toFixed(0) + "k",
          maxTicksLimit: 10, // حداکثر تعداد تقسیمات
          count: 1,
        },
        afterFit: (scaleInstance: any) => {
          scaleInstance.height = 80;
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col desktop:pt-[116px] tablet:pt-[137px] pt-[57px] desktop:gap-[63px] tablet:gap-[56px] gap-[32px]">
      <h2 className="tablet:text-right text-center text-black font-black tablet:text-[30px] tablet:leading-[50px] leading-[31px] text-xl">
        نمودار قیمت {name} و نرخ برابری تومان
      </h2>
      <div className="bg-white shadow-custom rounded-[30px]">
        <div className="w-full max-w-4xl mx-auto p-4 rtl" dir="rtl">
          <div className="rounded-lg border p-4">
            <div className="flex justify-start gap-[30px] mb-4">
              {["24h", "1w", "1m", "1y"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p as TimePeriod)}
                  className={`font-normal desktop:text-[12px] desktop:leading-[18px] w-[48px] ${
                    period === p ? "text-[#0D1A8E]" : "text-[#696464]"
                  }`}
                >
                  {p === "24h"
                    ? "24ساعته"
                    : p === "1w"
                    ? "1هفته"
                    : p === "1m"
                    ? "1ماه"
                    : "1سال"}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <Line
                options={topChartOptions}
                data={chartData}
                className="z-8"
              ></Line>
              <div className="w-full ">
                <Line options={bottomChartOptions} data={bottomChartData} />
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
