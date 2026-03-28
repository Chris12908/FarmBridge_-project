import { ProductCategory } from '@/lib/types/product.types';

export interface CategoryConfig {
  id: string;
  label: string;
  icon: string;
}

export const PRODUCT_CATEGORIES: CategoryConfig[] = [
  { id: 'all', label: 'All', icon: 'grid_view' },
  { id: ProductCategory.VEGETABLES, label: 'Vegetables', icon: 'eco' },
  { id: ProductCategory.FRUITS, label: 'Fruits', icon: 'nutrition' },
  { id: ProductCategory.GRAINS, label: 'Grains', icon: 'grain' },
  { id: ProductCategory.DAIRY, label: 'Dairy', icon: 'water_drop' },
  { id: ProductCategory.LIVESTOCK, label: 'Livestock', icon: 'pets' },
  { id: ProductCategory.HERBS, label: 'Herbs', icon: 'spa' },
  { id: ProductCategory.POULTRY, label: 'Poultry', icon: 'egg' },
  { id: ProductCategory.SEAFOOD, label: 'Seafood', icon: 'set_meal' },
  { id: ProductCategory.NUTS, label: 'Nuts', icon: 'forest' },
  { id: ProductCategory.OTHER, label: 'Other', icon: 'category' },
];
