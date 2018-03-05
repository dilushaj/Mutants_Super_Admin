export class Corner {

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

    public analyzeCorner(data:any) {
        let corner : any = {
            "shopCornerId": data.shopCornerId || 0,
            "channel": data.channel || 0,
            "shopId": data.shopId || 0,
            "branchId": data.branchId || 0,
            "name": data.name || "",
            "description": data.description || "",
            "type": data.type || 0,
            "typeName": data.typeName || null,
            "pax": data.pax || 0,
            "status":  data.status || 0,
            "statusName":  data.statusName || null,
            "rowStyle":  {
                "status" : {}
            }
        };
        return corner;
    }
}
