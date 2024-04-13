import BreadCrumb from "@/components/breadcrumb";
import { AddListingForm } from "@/components/forms/listing";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function AddNewOne() {
  const breadcrumbItems = [
    { title: "房源管理", link: "/cms/listing" },
    { title: "新增房源", link: "/cms/listing/add" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 p-5 space-y-4">
        <BreadCrumb items={breadcrumbItems} />
        <AddListingForm
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
