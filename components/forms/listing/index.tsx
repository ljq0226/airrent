"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addDays, format } from "date-fns";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./data";
import { DateRange } from "react-day-picker";
import {
  HouseDirection,
  PriceTypeOptions,
  RentTypeOptions,
} from "@/constants/data";
import FileUpload from "@/components/file-upload";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { post } from "@/lib";
import { useMessage } from "@/hooks/useMessage";
type AddListingFormValues = z.infer<typeof formSchema>;

interface AddListingFormProps {
  initialData: any | null;
}
type ProductFormValues = z.infer<typeof formSchema>;
export const AddListingForm: React.FC<AddListingFormProps> = ({
  initialData,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "编辑房源" : "新增房源";
  const description = "";
  const { message } = useMessage();
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "更新房源" : "新建房源";
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 5, 20),
    to: addDays(new Date(2024, 5, 20), 20),
  });
  const defaultValues = initialData
    ? initialData
    : {
        title: "",
        description: "",
        address: "",
        advantage: "",
        area: 0,
        price: 0,
        bathroomCount: 0,
        buildYear: 2010,
        city: "",
        direction: "",
        floor: 1,
        images: [],
        rentType: 0,
        keywords: "",
        livingroomCount: 0,
        roomCount: 1,
        totalFloor: 1,
        about: "",
        listingIntro: "",
        tenantPermission: "",
        others: "",
        bedroomFacilities: "",
        nearbyInfo: "",
      };

  const form = useForm<AddListingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const onSubmit = async () => {
    const formValue = form.getValues();
    const images = formValue.images.join("");
    const cover = images.split(",")[0];
    const code = "";
    delete formValue.rentTime;
    const [availableFrom, availableUntil] = [date?.from, date?.to];
    const postdata = {
      ...formValue,
      images,
      cover,
      code,
      availableFrom,
      availableUntil,
      landlordId: "17d20f4c-c354-49e4-9954-c1600049f7f8",
    };
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        const { code, data, msg } = await post(`listing/add_listing`, postdata);
        if (code == 200) {
          message({ title: "新增房源成功,请等待管理员审核" });
          router.replace("/cms/listing");
        } else {
          message({ title: msg });
        }
      }
    } catch (error: any) {
      message({ title: error.toString() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form className="w-full space-y-3 pr-[15%] pb-[200px]">
          <h2>基本信息</h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="房源标题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="gap-8 gap-y-2 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>关键词</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="房源关键词"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>城市</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="房源城市"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地址</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="房源地址"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="房源描述"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nearbyInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>附近描述</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="房源附近描述"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>图片</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value as any}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h1 className="mt-0">租赁信息</h1>
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="rentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>租赁方式</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="选择租赁方式"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RentTypeOptions.map((item) => (
                        <SelectItem key={item.label} value={item.value + ""}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>周期</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="租赁周期"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PriceTypeOptions.map((item) => (
                        <SelectItem key={item.label} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>价格</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>出租时间</FormLabel>
                  <FormControl>
                    <div className={cn("grid gap-2")}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h1 className="mt-0">建筑信息</h1>
          <div className="gap-8 md:grid md:grid-cols-5">
            <FormField
              control={form.control}
              name="roomCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>房间数</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="1"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="livingroomCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>客厅数</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="1"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bathroomCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>卫生间数</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="1"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>面积</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>楼层</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min={0}
                      placeholder="房源楼层"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalFloor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>总楼层</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min={0}
                      placeholder="房源楼层"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>建筑年份</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min={2000}
                      max={2030}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>朝向</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="房源朝向"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {HouseDirection.map((item) => (
                        <SelectItem key={item.label} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h1 className="mt-0">设施信息</h1>
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="advantage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>优势</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="房源优势"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bedroomFacilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>室内措施</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="房源室内措施"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h1 className="mt-0">关于此房源</h1>
          <div className="gap-8 md:grid md:grid-cols-4">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>介绍</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="房源优势"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="listingIntro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>房源介绍</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="房源介绍"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tenantPermission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>房客使用权限</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="房客使用权限"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="others"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>其他注意事项</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="其他注意事项"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
        <Button disabled={loading} className="ml-auto" onClick={onSubmit}>
          {action}
        </Button>
      </Form>
    </>
  );
};
