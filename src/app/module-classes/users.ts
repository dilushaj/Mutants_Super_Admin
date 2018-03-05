export class Users {

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
    let users: any = {
      "adminId": data.adminId || 0,
      "channel": data.channel || 0,
      "shopId": data.shopId || 0,
      "branchId": data.branchId || 0,
      "firstName": data.firstName || "",
      "lastName": data.lastName || "",
      "middleName": data.middleName || "",
      "userName": data.loginName || "",
      "address1": data.address1 || "",
      "address2": data.address2 || "",
      "email": data.email || "",
      "mobile": data.mobile || "",
      "dateOfBirth": data.dateOfBirth || "",
      "city": data.city || "",
      "postalCode": data.postalCode || "",
      "superAdmin": data.superAdmin || false,
      "superAdminName": data.superAdminName || null,
      "roles": data.roles || [],
      "status":  data.status || 0,
      "statusName":  data.statusName || null,
      "rowStyle":  {
        "status" : {}
      }
    };
    return users;
  }

}
