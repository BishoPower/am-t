import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AM-T Daily - Editorial",
  description:
    "The latest trends, insights, and stories from the AM-T trading community.",
};

type Props = {
  children: React.ReactNode;
};

export default function EditorialLayout({ children }: Props) {
  return <div className="min-h-screen">{children}</div>;
}
