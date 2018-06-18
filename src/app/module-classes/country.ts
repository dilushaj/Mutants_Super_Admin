export class Country {

  public analyzeFindByCriteriaReq(data:any) {
    let findByCriteriaReq:any = {
    };
    return findByCriteriaReq;
  }

  public analyzeCountry(data:any) {
    let countries: any = {
      "countryId": data.countryId || 0,
      "channel": data.channel || 0,
      "shopId": data.shopId || 0,
      "branchId": data.branchId || 0,
      "countryCode": data.countryCode || "",
      "name": data.name || "",
      "phoneCode": data.phoneCode || "",
      "status":  data.status || 0,
      "statusName":  data.statusName || null,
      "rowStyle":  {
        "status" : {}
      }
    };
    return countries;
  }

}
