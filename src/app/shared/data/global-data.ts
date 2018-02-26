export class GlobalData {

  public systemConfig : any = {};
  public authObject : any = {};

  public setAuthObject(val : any){
    this.authObject = val;
  }

  public setSystemConfigObject(val : any){
    this.systemConfig = val;
  }

}

