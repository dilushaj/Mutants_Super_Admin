export class GlobalFunction {

    public getEntitlementAvailability(allEntitlementList : any, availableEntitlementList : any, checkList : any){
        let elementsObject : any = {};
        elementsObject.AT_LEAST_ONE = false;
        for(var key in checkList){
            elementsObject[checkList[key]] = availableEntitlementList.indexOf(allEntitlementList[checkList[key]].ENTITLEMENT_ID) > -1;
            elementsObject.AT_LEAST_ONE = elementsObject[checkList[key]] ? true : elementsObject.AT_LEAST_ONE;
        }
        return elementsObject;
    }

    public getStatusObject(STATUS : number, STATUS_LIST : any){
        let object = {
            name : STATUS,
            style : {color:"#000000"}
        };
        switch(STATUS) {
            case STATUS_LIST.CREATED.ID : {
                object.name = STATUS_LIST.CREATED.NAME;
                object.style = {color:"#000000"};
                break;
            }
            case STATUS_LIST.PENDING.ID : {
                object.name = STATUS_LIST.PENDING.NAME;
                object.style = {color:"#0095ff"};
                break;
            }
            case STATUS_LIST.APPROVED.ID : {
                object.name = STATUS_LIST.APPROVED.NAME;
                object.style = {color:"#11c14b"};
                break;
            }
            case STATUS_LIST.CANCELED.ID : {
                object.name = STATUS_LIST.CANCELED.NAME;
                object.style = {color:"#8B4513"};
                break;
            }
            case STATUS_LIST.REVERTED.ID : {
                object.name = STATUS_LIST.REVERTED.NAME;
                object.style = {color:"#000000"};
                break;
            }
            case STATUS_LIST.REJECTED.ID : {
                object.name = STATUS_LIST.REJECTED.NAME;
                object.style = {color:"#dc3545"};
                break;
            }
            case STATUS_LIST.SUSPENDED.ID : {
                object.name = STATUS_LIST.SUSPENDED.NAME;
                object.style = {color:"#f5a718"};
                break;
            }
            case STATUS_LIST.BLACKLISTED.ID : {
                object.name = STATUS_LIST.BLACKLISTED.NAME;
                object.style = {color:"#ea1212"};
                break;
            }
            case STATUS_LIST.DELETED.ID : {
                object.name = STATUS_LIST.DELETED.NAME;
                object.style = {color:"#ea1212"};
                break;
            }
            case STATUS_LIST.AMENDED.ID : {
                object.name = STATUS_LIST.AMENDED.NAME;
                object.style = {color:"#000000"};
                break;
            }
            case STATUS_LIST.ACCEPTED.ID : {
                object.name = STATUS_LIST.ACCEPTED.NAME;
                object.style = {color:"#11c110"};
                break;
            }
            case STATUS_LIST.RELEASED.ID : {
                object.name = STATUS_LIST.RELEASED.NAME;
                object.style = {color:"#FF4500"};
                break;
            }
            case STATUS_LIST.DISPATCHED.ID : {
                object.name = STATUS_LIST.DISPATCHED.NAME;
                object.style = {color:"#000000"};
                break;
            }
            case STATUS_LIST.DELIVERED.ID : {
                object.name = STATUS_LIST.DELIVERED.NAME;
                object.style = {color:"#000000"};
                break;
            }
            case STATUS_LIST.DELIVERY_ACCEPTED.ID : {
                object.name = STATUS_LIST.DELIVERY_ACCEPTED.NAME;
                object.style = {color:"#000000"};
                break;
            }
            case STATUS_LIST.DELIVERY_REJECTED.ID : {
                object.name = STATUS_LIST.DELIVERY_REJECTED.NAME;
                object.style = {color:"#000000"};
                break;
            }
            default: {
                break;
            }
        }
        return object;
    }
}
