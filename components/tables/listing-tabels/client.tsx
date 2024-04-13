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

export const ListingClient = () => {
  const router = useRouter();
  const data = [];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`我的房源 (${data.length})`}
          description="已发布和未审核"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/cms/listing/add`)}
        >
          <Plus className="w-4 h-4 mr-2" /> 新增房源
        </Button>
      </div>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
