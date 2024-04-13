import * as z from "zod";

export const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});
export const IMG_MAX_LIMIT = 3;
export const formSchema = z.object({
  title: z.string().min(3, { message: "房源标题至少 3 个字符" }),
  description: z.string(),
  price: z.number().min(0, { message: "价格不能为负数" }),
  cover: z.string(), // 假设这是一个 URL
  images: z.string(), // 假设这是一个包含多个 URL 的字符串
  isChecked: z.boolean(),
  keywords: z.string().min(3, { message: "关键字至少 3 个字符" }),
  city: z.string().min(3, { message: "城市名称至少 3 个字符" }),
  address: z.string().min(3, { message: "地址至少 3 个字符" }),
  code: z.string(), // 假设这是一个经纬度的字符串
  status: z.string(),
  listingAboutId: z.string(),
  priceType: z.enum(["MONTHLY", "YEARLY"]), // 假设这是一个枚举
  rentType: z.number().int().min(0).max(1), // 假设这是一个 0 或 1 的整数
  roomCount: z.number().int().min(0, { message: "室数不能为负数" }),
  bathroomCount: z.number().int().min(0, { message: "卫生间数不能为负数" }),
  livingroomCount: z.number().int().min(0, { message: "厅数不能为负数" }),
  houseType: z.string(), // 假设这是一个描述户型的字符串
  area: z.number().min(0, { message: "面积不能为负数" }),
  direction: z.string(), // 假设这是一个描述朝向的字符串
  floor: z.number().int().min(0, { message: "楼层不能为负数" }),
  totalFloor: z.number().int().min(0, { message: "总楼层不能为负数" }),
  buildYear: z.number().int().min(0, { message: "建筑年份不能为负数" }),
  bedroomFacilities: z.string(), // 假设这是一个描述室内设施的字符串
  advantage: z.string(), // 假设这是一个描述优势的字符串
  rentTime: z.date(),
  // availableFrom: z.date(),
  // availableUntil: z.date(),
  nearbyInfo: z.string(), // 假设这是一个描述附近信息的字符串
  isRetail: z.boolean(),
  landlordId: z.string().optional(),
});
