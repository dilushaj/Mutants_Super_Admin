export class UserRoles {

  public analyzeFindByCriteriaReq(data:any) {
    let findByCriteriaReq:any = {

    };
    return findByCriteriaReq;
  }

  public analyzeUserRoles(data:any) {
    let userRoles: any = {
      "id": data.roleId || 0,
      "channel": data.channel || 0,
      "shopId": data.shopId || 0,
      "branchId": data.branchId || 0,
      "name": data.name || "",
      "entitlements": data.entitlements || [],
      "status":  data.status || 0,
      "statusName":  data.statusName || null,
      "rowStyle":  {
        "status" : {}
      }
    };
    return userRoles;
  }

}
