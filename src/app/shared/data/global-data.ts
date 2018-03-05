export class GlobalData {

    public systemConfig : any = {};
    public authObject : any = {};
    public navigationMenuList : any = [];
    public domainFeatures : any = {};
    public domainProperty : any = {};

    public setAuthObject(val : any) {
        this.authObject = val;
    }

    public setSystemConfigObject(val : any) {
        this.systemConfig = val;
    }

    public setNavigationMenu(val : any) {
        this.navigationMenuList = val;
    }

    public setDomainProperty(val : any) {
        this.domainProperty = val;
    }

    public setDomainFeatures(val : any) {
        this.domainFeatures = val;
    }

}

