"use client";

import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { getTimeframeProduct } from "@/lib/actions/Product";
import { getTimeframeCategories } from "@/lib/actions/Category";
import { getTimeframeUser } from "@/lib/actions/User";
import { getTimeframeOrder } from "@/lib/actions/Order";
import TopCategories from "./TopCategories";
import Sales from "./Sales";

const Admin = () => {
  const [active, setActive] = useState<string>("All");
  const [userCount, setUserCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [totalSale, setTotalSale] = useState<number>(0);

  const [categoryData, setCategoryData] = useState<number[]>([150, 230, 15]);
  const [categoryLabels, setCategoryLabels] = useState<string[]>([
    "Electronics",
    "Furniture",
    "Shoes",
  ]);

  const [onlineSales, setOnlineSales] = useState<number[]>([
    12000, 15000, 8000, 17000, 22000, 18000, 25000,
  ]);
  const [inStoreSales, setInStoreSales] = useState<number[]>([
    10000, 12000, 14000, 13000, 16000, 19000, 21000,
  ]);

  const labels =
    active === "Today"
      ? ["Hour 1", "Hour 2"]
      : active === "Week"
      ? [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ]
      : active === "Month"
      ? ["Week 1", "Week 2", "Week 3", "Week 4"]
      : active === "Year"
      ? [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]
      : ["2020", "2021", "2022", "2023"]; // for "All" showing multiple years

  const title = `${active === "All" ? "All Time" : active} sales revenue`;

  const handleButtonClick = (timePeriod: string) => {
    setActive(timePeriod);

    if (timePeriod === "Today") {
      setCategoryData([10, 15, 5]);
      setCategoryLabels(["Electronics", "Furniture", "Shoes"]);
      setOnlineSales([1000, 800, 600]);
      setInStoreSales([500, 700, 900]);
    } else if (timePeriod === "Week") {
      setCategoryData([50, 60, 25]);
      setCategoryLabels(["Electronics", "Furniture", "Shoes"]);
      setOnlineSales([5000, 7000, 4500, 6000, 8000, 9000, 10000]); // 7 days
      setInStoreSales([4000, 6000, 3500, 5000, 5500, 7000, 7500]);
    } else if (timePeriod === "Month") {
      setCategoryData([120, 150, 65]);
      setCategoryLabels(["Electronics", "Furniture", "Shoes"]);
      setOnlineSales([10000, 12000, 8500, 9000]); // 12 months
      setInStoreSales([9000, 10000, 8000, 8500]);
    } else if (timePeriod === "Year") {
      setCategoryData([500, 600, 350]);
      setCategoryLabels(["Electronics", "Furniture", "Shoes"]);
      setOnlineSales([
        55000, 60000, 45000, 50000, 60000, 65000, 70000, 75000, 80000, 85000,
        90000, 95000,
      ]); // Monthly data
      setInStoreSales([
        50000, 55000, 50000, 55000, 60000, 70000, 75000, 80000, 85000, 90000,
        95000, 100000,
      ]);
    } else if (timePeriod === "All") {
      setCategoryData([240, 230, 300]);
      setCategoryLabels(["Electronics", "Furniture", "Shoes"]);
      setOnlineSales([120000, 150000, 85000, 170000, 220000, 180000, 250000]); // Multi-year data
      setInStoreSales([100000, 120000, 140000, 130000, 160000, 190000, 210000]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const product = await getTimeframeProduct(active.toLowerCase());
      const category = await getTimeframeCategories(active.toLocaleLowerCase());
      const user = await getTimeframeUser(active.toLowerCase());
      const order = await getTimeframeOrder(active.toLowerCase());

      setProductCount(product.length);
      setCategoryCount(category.length);
      setUserCount(user.length);
      setOrderCount(order.orders.length);
      setTotalSale(order.totalSale);
    }

    fetchData();
  }, [active]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 border-2 rounded-md bg-slate-100 mr-auto">
        <button
          className={`px-6 py-1 rounded-md ${
            active === "All" ? "bg-slate-200" : ""
          }`}
          onClick={() => handleButtonClick("All")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            active === "Today" ? "bg-slate-200" : ""
          }`}
          onClick={() => handleButtonClick("Today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            active === "Week" ? "bg-slate-200" : ""
          }`}
          onClick={() => handleButtonClick("Week")}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            active === "Month" ? "bg-slate-200" : ""
          }`}
          onClick={() => handleButtonClick("Month")}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            active === "Year" ? "bg-slate-200" : ""
          }`}
          onClick={() => handleButtonClick("Year")}
        >
          Year
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <AdminCard title="users" total={userCount} />
        <AdminCard title="products" total={productCount} />
        <AdminCard title="categories" total={categoryCount} />
        <AdminCard title="orders" total={orderCount} />
      </div>
      <div className="flex gap-8">
        <div className="h-96 w-96 shadow-md p-4">
          <TopCategories
            time={active}
            categoryData={categoryData}
            categoryLabels={categoryLabels}
          />
        </div>
        <div className="h-96 w-full p-4 shadow-md">
          <Sales
            labels={labels}
            onlineSales={onlineSales}
            inStoreSales={inStoreSales}
            title={title}
            active={active}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
