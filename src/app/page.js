"use client";
import Image from "next/image";
import LineChart from "@/components/LineChart";
import { Layout, Typography } from "antd";

const {Title} = Typography

export default function Home() {
  return (
    <Layout>
      <Title level={4} className="text-center m-3">Biểu đồ bán hàng</Title>
      <LineChart/>
    </Layout>
  );
}
