export class Authentication {

  public analyzeLoginRequest (data: any) {
    const loginRequest: any = {
      'channel': data.channel || 0,
      'shopId': data.shopId || 0,
      'branchId': data.branchId || 0,
      'loginName': data.loginName || 'null',
      'password': data.password || 'null',
      'deviceId': data.deviceId || 0
    };
    return loginRequest;
  }

  public analyzeLoginResponse (data: any) {
    const loginResponse: any = {
      'adminId': data.adminId || 0,
      'status': data.status || 0,
      'errorMessage': data.errorMessage || null,
      'name': data.name || null,
      'shopId': data.shopId || 0,
      'branchId': data.branchId || 0,
      'shopName': data.shopName || null,
      'motto': data.motto || null,
      'sessionId': data.sessionId || null,
      'firstTime': data.firstTime || false,
      'shopImage': data.shopImage || null,
      'entitlements': data.entitlements || [],
      'superAdmin': data.superAdmin || false,
      'xAdmin': data.xAdmin || false,
      'branches': data.branches || [],
      'shopType': data.shopType || 0,
      'shopCategory': data.shopCategory || 0,
      'shopCurrency': data.shopCurrency || null,
      'preparationPoint': data.preparationPoint || 0,
      'servingPoint': data.servingPoint || 0,
      'consumingPoint': data.consumingPoint || 0
    };
    return loginResponse;
  }

  public analyzeLoginName (data: any) {
    const LoginName: any = {
      'channel': data.channel || 0,
      'shopId': data.shopId || 0,
      'branchId': data.branchId || 0,
      'loginName': data.loginName || null
    };
    return LoginName;
  }
}
