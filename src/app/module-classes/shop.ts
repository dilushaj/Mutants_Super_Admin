export class Shop {

    public analyzeFindByCriteriaReq(data:any) {
        let findByCriteriaReq:any = {
            "channel": data.channel || null,
            "shopId": data.shopId || 0,
            "branchId": data.branchId || 0,
            "PKs": data.PKs || [],
            "offset": data.offset || 0,
            "limit": data.limit || 1,
            "searchKeys": data.searchKeys || [],
            "values": data.values || [],
            "operators": data.operators || [],
            "fromDate": data.fromDate || null,
            "toDate": data.toDate || null,
            "orderByKey": data.orderByKey || null,
            "orderByValue": data.orderByValue || null,
            "groupBy": data.groupBy || [],
            "statuses": data.statuses || []
        };
        return findByCriteriaReq;
    }

    public analyzeShop(data:any) {
        let shop : any = {
            "_id":  data._id || 0,
            "address": data.address || null,
            "address1":  data.address1 || null,
            "details":  data.details || {},
            "email":  data.email || null,
            "image":  data.image || null,
            "mainBranchId":  data.mainBranchId || 0,
            "motto":  data.motto || null,
            "nbt":  data.nbt || 0,
            "postalCode":  data.postalCode || null,
            "productBrands":  data.productBrands || [],
            "productCategories":  data.productCategories || [],
            "shopCategory":  data.shopCategory || 0,
            "shopId":  data.shopId || 0,
            "shopName":  data.shopName || "",
            "shopType":  data.shopType || 0,
            "status":  data.status || 0,
            "telephone":  data.telephone || "",
            "telephone2":  data.telephone2 || "",
            "vat":  data.vat || 0,
            "statusName":  data.statusName || null,
            "rowStyle":  {
                "status" : {}
            }
        };
        return shop;
    }
}
