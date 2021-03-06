export class MasterData {

  public analyzeEntitlement(data: any) {
    const entitlement: any = {
      'channel': data.channel || 0,
      'shopId': data.shopId || 0,
      'branchId': data.branchId || 0,
      'domainId': data.domainId || 0,
      'entitlementIds': data.entitlementIds || []
    };
    return entitlement;
  }

  public analyzeResponseEntitlement(data: any) {
    const entitlement: any = {
      'entitlementId': data.entitlementId || 0,
      'name': data.name || null,
      'description': data.description || null,
      'functions': data.functions || null,
      'status': data.status || 0,
      'isCheck': data.isCheck || false
    };
    return entitlement;
  }

  public analyzeShopEnt(data: any) {
    const entitlement: any = {
      'channel': data.channel || 0,
      'shopId': data.shopId || 0,
      'branchId': data.branchId || 0,
      'entitlementIds': data.entitlementIds || []
    };
    return entitlement;
  }

  public analyzeResponseCategory(data: any) {
    const productCategory: any = {
      'categoryId': data.categoryId || 0,
      'parentCategoryId': data.parentCategoryId || 0,
      'shopId': data.shopId || 0,
      'name': data.name || null,
      'type': data.type || null,
      'value': data.value || null,
      'image': data.image || '',
      'shopCategoryId': data.shopCategoryId || 0,
      'status': data.status || 0,
      'dataType': data.dataType || 0,
      'shopTypeId': data.shopTypeId || 0,
      'parent': data.parent || false,
      'parentCategoryValue': data.parentCategoryValue || null,
      'statusName': data.statusName || null,
      'rowStyle': {
        'status': {}
      },
      'shopTypeName': data.shopTypeName || null,
      'shopCategoryName': data.shpCategoryName || null,
      'dataTypeName': data.dataTypeName || null,
      'parentCategoryName': data.parentCategoryName || null
    };
    return productCategory;
  }

  public analyzeResponseBrand(data: any) {
    const brand: any = {
      'brandId': data.brandId || 0,
      'description': data.description || '',
      'name': data.name || null,
      'image': data.image || '',
      'shopCategoryId': data.shopCategoryId || 0,
      'status': data.status || 0,
      'url': data.url || null,
      'statusName': data.statusName || null,
      'rowStyle': {
        'status': {}
      },
      'shopCategoryName': data.shopCategoryName || null,
    };
    return brand;
  }

  public analyzeUpdateCategory(data: any) {
    const updatedProductCategory: any = {
      'categoryId': data.categoryId || 0,
      'parentCategoryId': data.parentCategoryId || 0,
      'name': data.name || null,
      'type': data.type || null,
      'value': data.value || null,
      'image': data.image || '',
      'shopCategoryId': data.shopCategoryId || 0,
      'dataType': data.dataType || 0,
      'shopTypeId': data.shopTypeId || 0,
      'parent': data.parent || false
    };
    return updatedProductCategory;
  }

  public analyzeShopCatogory(data: any) {
    const category: any = {
      'categoryId': data.categoryId || 0,
      'name': data.name || null,
      'description': data.description || null,
      'status': data.status || 0,
      'statusName': data.statusName || null,
      'rowStyle': {
        'status': {}
      }
    };
    return category;
  }

  public analyzeRequestCategory(data: any) {
    const category: any = {
      'type': data.type || null,
      'dataType': data.dataType || 0,
      'shopCategoryId': data.shopCategoryId || 0,
      'shopTypeId': data.shopTypeId || 0,
      'parent': data.parent || false,
      'value': data.value || null,
      'parentCategoryId': data.parentCategoryId || 0,
      'image': data.image || ''
    };
    return category;
  }

  public analyzeRequestBrand(data: any) {
    const category: any = {
      'name': data.name || null,
      'shopCategoryId': data.shopCategoryId || 0,
      'description': data.description || '',
      'image': data.image || null
    };
    return category;
}
  public analyzeUpdateBrand(data: any) {
    const updatedBrand: any = {
      'brandId': data.brandId || 0,
      'name': data.name || null,
      'shopCategoryId': data.shopCategoryId || 0,
      'description': data.description || '',
      'image': data.image || null,
      'url': data.url || null
    };
    return updatedBrand;
  }

  public analyzeNewMasterData(data: any) {
    const masterData: any = {
      'masterDataId': data.masterDataId || 0,
      'product_groups': data.product_groups || {},
      'status': data.status || 0
    };
    return masterData;
  }

  public analyszeUpdataMasterData(data: any) {
    const masterData: any = {
      'masterDataId': data.masterDataId || 0,
      'product_groups': data.product_groups || {},
      'status': data.status || 0,
      '_id': data._id || 0
    };
    return masterData;
  }
}

