export class Shop {

    public analyzeFindByCriteriaReq(data: any) {
        const findByCriteriaReq: any = {
            'channel': data.channel || null,
            'shopId': data.shopId || 0,
            'branchId': data.branchId || 0,
            'PKs': data.PKs || [],
            'offset': data.offset || 0,
            'limit': data.limit || 1,
            'searchKeys': data.searchKeys || [],
            'values': data.values || [],
            'operators': data.operators || [],
            'fromDate': data.fromDate || null,
            'toDate': data.toDate || null,
            'orderByKey': data.orderByKey || null,
            'orderByValue': data.orderByValue || null,
            'groupBy': data.groupBy || [],
            'statuses': data.statuses || []
        };
        return findByCriteriaReq;
    }
    public analyzeShop(data: any) {
        const shop: any = {
            '_id':  data._id || 0,
            'address': data.address || null,
            'address1':  data.address1 || null,
            'details':  data.details || {},
            'email':  data.email || null,
            'image':  data.image || null,
            'mainBranchId':  data.mainBranchId || 0,
            'motto':  data.motto || null,
            'nbt':  data.nbt || 0,
            'postalCode':  data.postalCode || null,
            'productBrands':  data.productBrands || [],
            'productCategories':  data.productCategories || [],
            'shopCategory':  data.shopCategory || 0,
            'shopId':  data.shopId || 0,
            'shopName':  data.shopName || '',
            'shopType':  data.shopType || 0,
            'status':  data.status || 0,
            'telephone':  data.telephone || '',
            'telephone2':  data.telephone2 || '',
            'city': data.city || '',
            'vat':  data.vat || 0,
            'shopCategoryName': data.shopCategoryName || null,
            'statusName':  data.statusName || null,
            'rowStyle':  {
                'status' : {}
            }
        };
        return shop;
    }
    public analyzeNewShop(data: any) {
      const newShop: any = {
        'user': {
          'firstName': data.firstName || '' ,
          'lastName': data.lastName || '',
          'loginName': data.loginName || '',
          'password': data.password || '',
        },

        'productCategories': data.productCategories || [],
        'email': data.email || '',
        'shopName': data.shopName || '',
        'address1': data.address1 || null,
        'address2':  data.address2 || null,
        'city': data.city || '',
        'postalCode': data.postalCode || null,
        'telephone': data.telephone || '',
        'shopCategory': data.shopCategory ||  0,
        'countryId': data.countryId || 0,
        'currency': data.currency || '',
        'shopType': 1
      };
      return newShop;
    }
    public analyzeShopCatogory(data: any) {
      const category: any = {
        'categoryId':  data.categoryId || 0,
        'name':  data.name || null,
        'description': data.description || null,
        'status': data.status || 0,
        'statusName': data.statusName || null,
        'rowStyle':  {
          'status' : {}
        }
      };
      return category;
    }
}
