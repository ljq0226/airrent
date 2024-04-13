"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { PriceTypeMap, User } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
type PriceType = "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "标题",
  },
  {
    accessorKey: "address",
    header: "地址",
  },
  {
    accessorKey: "city",
    header: "城市",
  },
  {
    accessorKey: "price",
    header: "价格",
  },
  {
    accessorKey: "priceType",
    header: "租期",
    cell: ({ row }) => {
      const type: PriceType = row.getValue("priceType");
      return PriceTypeMap[type];
    },
  },
  {
    accessorKey: "rentType",
    header: "租住形式",
    cell: ({ row }) => {
      const type = row.getValue("rentType");
      return Number(type) == 1 ? "合租" : "整租";
    },
  },
  {
    accessorKey: "area",
    header: "面积/m2",
  },
  {
    accessorKey: "availableFrom",
    header: "可租赁开始时间",
    cell: ({ row }) =>
      dayjs(row.getValue("availableFrom")).format("YYYY-MM-DD"),
  },
  {
    accessorKey: "availableUntil",
    header: "可租赁结束时间",
    cell: ({ row }) =>
      dayjs(row.getValue("availableUntil")).format("YYYY-MM-DD"),
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <>
          {status == 0 ? (
            <>
              <Badge className="text-black cursor-pointer bg-orange-300/50 hover:bg-orange-300/30">
                {"未出租"}
              </Badge>
            </>
          ) : (
            <Badge className="text-black cursor-pointer bg-green-300/50 hover:bg-green-300/30">
              {"已出租"}
            </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "isChecked",
    header: "审核",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <>
          {status == 0 ? (
            <>
              <Badge className="text-black cursor-pointer bg-red-500/60 hover:bg-red-500/30">
                {"未审核"}
              </Badge>
            </>
          ) : (
            <Badge className="text-black cursor-pointer bg-green-600/80 hover:bg-green-800/30">
              {"通过"}
            </Badge>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    header: "操作",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
