"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useEffect, useMemo, useState } from "react";
import { useMessage } from "@/hooks/useMessage";
import { get } from "@/lib";
import TableStore from "@/store/table";

export const ListingClient = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState<any>([]);
  const { message } = useMessage();
  const [listingTableRefresh, setListingTableRefresh, setUpdateListingData] =
    TableStore((s) => [
      s.listingTableRefresh,
      s.setListingTableRefresh,
      s.setUpdateListingData,
    ]);
  const getAllData = async () => {
    try {
      const { code, data, msg }: { code: number; data: any; msg: string } =
        await get("listing/getall_listing");
      if (code === 200) {
        const arr = data.arr as any[];
        setTableData(arr);
      } else {
        message({ title: msg });
      }
    } catch (err: any) {
      message({ title: err.toString() });
    }
  };
  useEffect(() => {
    getAllData();
    setUpdateListingData(null);
  }, [listingTableRefresh]);
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`我的房源 (${tableData.length})`}
          description="已发布和未审核"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/cms/listing/edit`)}
        >
          <Plus className="w-4 h-4 mr-2" /> 新增房源
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={tableData} />
    </>
  );
};
