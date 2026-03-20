import axiosClient from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';
import type {
  CreateProductDto,
  ListingStatus,
  Product,
  ProductQueryParams,
  UpdateProductDto,
} from '@/lib/types/product.types';
import type { PaginatedData } from '@/lib/types/api.types';

export const productService = {
  async searchProducts(
    params: ProductQueryParams
  ): Promise<PaginatedData<Product>> {
    const qs = buildQueryString(params as Record<string, unknown>);
    const { data } = await axiosClient.get<PaginatedData<Product>>(
      `/products${qs}`
    );
    return data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { data } = await axiosClient.get<Product[]>('/products/featured');
    return data;
  },

  async autocomplete(q: string): Promise<string[]> {
    const { data } = await axiosClient.get<string[]>(
      `/products/autocomplete?q=${encodeURIComponent(q)}`
    );
    return data;
  },

  async getFarmerProducts(
    farmerId: string,
    status?: ListingStatus
  ): Promise<Product[]> {
    const qs = status ? `?status=${status}` : '';
    const { data } = await axiosClient.get<Product[]>(
      `/products/farmer/${farmerId}${qs}`
    );
    return data;
  },

  async getProduct(id: string): Promise<Product> {
    const { data } = await axiosClient.get<Product>(`/products/${id}`);
    return data;
  },

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const { data } = await axiosClient.post<Product>('/products', dto);
    return data;
  },

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const { data } = await axiosClient.patch<Product>(`/products/${id}`, dto);
    return data;
  },

  async updateProductStatus(
    id: string,
    status: ListingStatus
  ): Promise<Product> {
    const { data } = await axiosClient.patch<Product>(
      `/products/${id}/status`,
      { status }
    );
    return data;
  },

  async renewProduct(id: string): Promise<Product> {
    const { data } = await axiosClient.patch<Product>(`/products/${id}/renew`);
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    await axiosClient.delete(`/products/${id}`);
  },
};
