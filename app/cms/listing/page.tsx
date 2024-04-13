import BreadCrumb from "@/components/breadcrumb";
import { ListingClient } from "@/components/tables/listing-tabels/client";

const breadcrumbItems = [{ title: "房源管理", link: "/cms/listing" }];
export default function page() {
  return (
    <>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ListingClient />
      </div>
    </>
  );
}
