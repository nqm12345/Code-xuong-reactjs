export interface Product {
  id?: string | number;
  title: string;
  image?: string;
  thumbnail?: string[]; // Mảng các thumbnail
  oldprice: number; // Giá cũ
  newprice: number; // Giá mới
  category: string; // Danh mục sản phẩm
  desc: string; // Mô tả sản phẩm
}
