"use client";
import BreadCrumb from "@/components/breadcrumb";
import { AddListingForm } from "@/components/forms/listing";
import { ScrollArea } from "@/components/ui/scroll-area";
import TableStore from "@/store/table";
import React, { useEffect } from "react";

export default function AddNewOne() {
  const breadcrumbItems = [
    { title: "房源管理", link: "/cms/listing" },
    { title: "编辑房源", link: "/cms/listing/edit" },
  ];
  const [updateListingData] = TableStore((s) => [s.updateListingData]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 p-5 space-y-4">
        <BreadCrumb items={breadcrumbItems} />
        <AddListingForm initialData={updateListingData} key={null} />
      </div>
    </ScrollArea>
  );
}
