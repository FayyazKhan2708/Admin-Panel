import React from "react";
import { Box, Flex, Select, Heading } from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 50 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 20 },
  { name: "Apr", value: 30 },
  { name: "May", value: 70 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 90 },
  { name: "Aug", value: 70 },
  { name: "Sep", value: 80 },
  { name: "Oct", value: 90 },
  { name: "Nov", value: 55 },
  { name: "Dec", value: 120 },
];

const ActivityChart = () => {
  return (
    <Box bg="white" p={6} rounded="lg" shadow="base">
      <Flex justifyContent="space-between" mb={6}>
        <Heading size="md">Activity</Heading>
        <Flex gap={4}>
          <Select defaultValue="all-enterprises" w="200px">
            <option value="all-enterprises">All Enterprises</option>
          </Select>
          <Select defaultValue="all-members" w="200px">
            <option value="all-members">All Members</option>
          </Select>
          <Select defaultValue="monthly" w="200px">
            <option value="monthly">Monthly</option>
          </Select>
        </Flex>
      </Flex>

      <Box h="400px">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#E6FFFA" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4FD1C5"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={{ stroke: "#4FD1C5", strokeWidth: 2, fill: "white", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ActivityChart;
