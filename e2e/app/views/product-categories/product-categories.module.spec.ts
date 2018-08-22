import { ProductCategoriesModule } from './product-categories.module';

describe('ProductCategoriesModule', () => {
  let productCategoriesModule: ProductCategoriesModule;

  beforeEach(() => {
    productCategoriesModule = new ProductCategoriesModule();
  });

  it('should create an instance', () => {
    expect(productCategoriesModule).toBeTruthy();
  });
});
