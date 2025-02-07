import React from "react";
import { Grid } from "@chakra-ui/react";
import { FaBuilding, FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";
import StatCard from "./StatCard";

const StatsGrid = () => {
  const stats = [
    { title: "Total Enterprises", value: "08", icon: FaBuilding },
    { title: "Total Members", value: "27", icon: FaUsers },
    { title: "Total Earnings", value: "$2003", icon: FaDollarSign },
    { title: "Total Applications", value: "5", icon: FaChartLine },
  ];

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={6}
      mb={8}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </Grid>
  );
};

export default StatsGrid;
