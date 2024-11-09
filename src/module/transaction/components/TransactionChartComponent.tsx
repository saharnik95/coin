"use client";

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

const timeLabels: Record<TimePeriod, string[]> = {
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
  name = "بیت کوین",
  code = "BTC",
}: TransactionChartComponentProps) {
  const [period, setPeriod] = React.useState<TimePeriod>("24h");
  const [chartData, setChartData] = React.useState<{
    currencyPrices: number[];
    usdPrices: number[];
    equality: number[];
  }>({ currencyPrices: [], usdPrices: [], equality: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://b.wallet.ir/coinlist/chart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ period: period, currency_code: code }),
        });
        const data = await response.json();
        setChartData({
          currencyPrices: data.items.map((item: any) => item.price),
          usdPrices: data.items.map((item: any) => item.usd_price),
          equality: data.items.map((item: any) => item.irt_price),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [code, period]);

  const topChartData = {
    labels: timeLabels[period],
    datasets: [
      {
        label: "برابری",
        data: chartData.equality,
        borderColor: "rgba(22, 82, 240, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderWidth: 1,
        pointRadius: 0,
        fill: false,
      },
      {
        label: `قیمت ${name}`,
        data: chartData.currencyPrices,
        borderColor: "rgba(247, 147, 26, 1)",
        backgroundColor: "rgba(254,244,232,255)",
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
        data: chartData.usdPrices,
        borderColor: "rgba(75, 181, 67, 1)",
        backgroundColor: "rgba(246,253,246,255)",
        fill: true,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  const topChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: { display: false },
      legend: { display: false },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: true, drawTicks: true, display: true, z: 10 },
        ticks: {
          callback: (value: number) => (value / 1000000000).toFixed(3) + "M",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: { drawOnChartArea: false },
        ticks: {
          callback: (value: number) => (value / 1000).toFixed(0) + "k",
        },
      },
    },
  };

  const bottomChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: { display: false },
      legend: { display: false },
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
          callback: (value: number) => (value / 1000).toFixed(0) + "k",
          maxTicksLimit: 10,
          count: 1,
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
        <div
          className="w-full  desktop:pt-[20px] desktop:pb-[11px] desktop:px-[66px] 
        tablet:pt-[12px] tablet:pb-[9px] tablet:px-[40px]  pt-[21px] pb-[34px] px-[21px]
         rtl"
          dir="rtl"
        >
          <div className="rounded-lg ">
            <div className="flex justify-start desktop:gap-[30px] tablet:gap-[8px] gap-[19px] desktop:mb-[23px] tablet:mb-[8px] mb-[21px]">
              {(Object.keys(timeLabels) as TimePeriod[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`font-normal text-[12px] leading-[18px] w-[48px] ${
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
            <div className="space-y-[58px] tablet:space-y-[34px] desktop:space-y-[53px]">
              <div className="desktop:h-[404px] tablet:h-[259px] h-[233px] ">
                <Line options={topChartOptions} data={topChartData} />
              </div>
              <div
                className="desktop:h-[135px] tablet:h-[87px] h-[99px]  border-b-[2.5px] tablet:border-b-[1px] border-[#F1F1F1]
              pb-[11px] tablet:pb-[3px] desktop:pb-[15px]"
              >
                <Line options={bottomChartOptions} data={bottomChartData} />
              </div>
            </div>
            <div className="flex justify-center items-center mt-[22px] tablet:mt-[6px] desktop:mt-[14px] rtl-space-x-reverse">
              {[
                { color: "rgba(75,181,67,1)", label: "نرخ دلار" },
                { color: "rgba(22,82,240,1)", label: "برابری" },
                { color: "rgba(247,147,26,1)", label: `قیمت ${name}` },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center desktop:pl-[57px] pl-[23px]"
                >
                  <div
                    className="desktop:w-[10px] desktop:h-[10px] w-[7px] h-[7px] rounded-full ml-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs font-extralight leading-[18.78px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
