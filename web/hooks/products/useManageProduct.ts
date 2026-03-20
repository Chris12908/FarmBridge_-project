import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { productService } from '@/services/product.service';
import type {
  CreateProductDto,
  ListingStatus,
  UpdateProductDto,
} from '@/lib/types/product.types';

export function useManageProduct(farmerId?: string) {
  const queryClient = useQueryClient();

  function invalidateProducts() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.all });
    if (farmerId) {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.farmerProducts(farmerId),
      });
    }
  }

  const create = useMutation({
    mutationFn: (dto: CreateProductDto) => productService.createProduct(dto),
    onSuccess: invalidateProducts,
  });

  const update = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateProductDto }) =>
      productService.updateProduct(id, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.detail(data.id),
      });
      invalidateProducts();
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ListingStatus }) =>
      productService.updateProductStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.detail(data.id),
      });
      invalidateProducts();
    },
  });

  const renew = useMutation({
    mutationFn: (id: string) => productService.renewProduct(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.detail(data.id),
      });
      invalidateProducts();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: invalidateProducts,
  });

  return { create, update, updateStatus, renew, remove };
}
