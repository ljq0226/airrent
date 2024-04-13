"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/constants/data";
import { useMessage } from "@/hooks/useMessage";
import { post } from "@/lib";
import TableStore from "@/store/table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { id } = data;
  const [
    listingTableRefresh,
    setListingTableRefresh,
    updateListingData,
    setUpdateListingData,
  ] = TableStore((s) => [
    s.listingTableRefresh,
    s.setListingTableRefresh,
    s.updateListingData,
    s.setUpdateListingData,
  ]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { message } = useMessage();
  const router = useRouter();

  const onConfirm = async () => {
    try {
      const { code, msg } = await post(`listing/delete_listing/${id}`, {});
      if (code == 200) {
        setListingTableRefresh(!listingTableRefresh);
        message({ title: "删除操作成功" });
      } else {
        message({ title: msg });
      }
    } catch (err) {
      message({ title: "删除操作失败" + err });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onConfirm();
          setOpen(false);
        }}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>操作</DropdownMenuLabel> */}
          <DropdownMenuItem
            onClick={() => {
              router.push(`/cms/listing/edit`);
              setUpdateListingData(data);
            }}
          >
            <Edit className="w-4 h-4 mr-2" /> 编辑
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" /> 删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
