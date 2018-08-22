export class Users {

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

  public analyzeCreateUser(data: any) {
    const users: any = {
      'channel': data.channel || 0,
      'shopId': data.shopId || 0,
      'branchId': data.branchId || 0,
      'firstName': data.firstName || '',
      'lastName': data.lastName || '',
      'middleName': data.middleName || '',
      'loginName': data.loginName || '',
      'password': data.password || '',
      'address1': data.address1 || '',
      'address2': data.address2 || '',
      'email': data.email || '',
      'mobile': data.mobile || '',
      'dateOfBirth': data.dateOfBirth || '',
      'city': data.city || '',
      'postalCode': data.postalCode || '',
      'superAdmin': data.superAdmin || false,
      'roles': data.roles || [],
      'countryId':  data.countryId || 0,
      'preparationPoint': data.preparationPoint || 0,
      'servingPoint': data.servingPoint || 0,
      'consumingPoint': data.consumingPoint || 0,
    };
    return users;
  }

  public analyzeUpdateUser(data: any) {
    const users: any = {
      'channel': data.channel || 0,
      'shopId': data.shopId || 0,
      'branchId': data.branchId || 0,
      'adminId': data.adminId || 0,
      'firstName': data.firstName || '',
      'lastName': data.lastName || '',
      'middleName': data.middleName || '',
      'address1': data.address1 || '',
      'address2': data.address2 || '',
      'email': data.email || '',
      'mobile': data.mobile || '',
      'dateOfBirth': data.dateOfBirth || '',
      'city': data.city || '',
      'postalCode': data.postalCode || '',
      'roles': data.roles || [],
      'countryId':  data.countryId || 0,
      'preparationPoint': data.preparationPoint || 0,
      'servingPoint': data.servingPoint || 0,
      'consumingPoint': data.consumingPoint || 0,
    };
    return users;
  }

  public analyzeUser(data: any) {
    const users: any = {
      'adminId': data.adminId || 0,
      'channel': data.channel || 0,
      'shopId': data.shopId || 0,
      'branchId': data.branchId || 0,
      'firstName': data.firstName || '',
      'lastName': data.lastName || '',
      'middleName': data.middleName || '',
      'loginName': data.loginName || '',
      'address1': data.address1 || '',
      'address2': data.address2 || '',
      'email': data.email || '',
      'mobile': data.mobile || '',
      'dateOfBirth': data.dateOfBirth || '',
      'city': data.city || '',
      'postalCode': data.postalCode || '',
      'superAdmin': data.superAdmin || false,
      'superAdminName': data.superAdminName || null,
      'roles': data.roles || [],
      'status':  data.status || 0,
      'statusName':  data.statusName || null,
      'rowStyle':  {
        'status' : {}
      },
      'countryId':  data.countryId || 0,
      'preparationPoint': data.preparationPoint || 0,
      'servingPoint': data.servingPoint || 0,
      'consumingPoint': data.consumingPoint || 0,
    };
    return users;
  }

}
