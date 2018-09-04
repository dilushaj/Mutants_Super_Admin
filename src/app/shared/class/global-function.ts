export class GlobalFunction {

    public getEntitlementAvailability(allEntitlementList: any, availableEntitlementList: any, checkList: any) {
        const elementsObject: any = {};
        elementsObject.AT_LEAST_ONE = false;
        for (const key in checkList) {
            elementsObject[checkList[key]] = availableEntitlementList.indexOf(allEntitlementList[checkList[key]].ENTITLEMENT_ID) > -1;
            elementsObject.AT_LEAST_ONE = elementsObject[checkList[key]] ? true : elementsObject.AT_LEAST_ONE;
        }
        // console.log(elementsObject.AT_LEAST_ONE);
        return elementsObject;
    }
  public mapShopCategory (shopCategories: any, categoryId: any) {
    let categoryName;
    for (let i = 0; i < shopCategories.length; i++) {
      if (shopCategories[i].categoryId === categoryId) {
        categoryName = shopCategories[i].name;
        break;
      }
    }
    return categoryName;
  }

    public getStatusObject(STATUS: number, STATUS_LIST: any) {
        let key: any = null;
        switch (STATUS) {
            case STATUS_LIST.CREATED.ID :
            {
                key = 'CREATED';
                break;
            }
            case STATUS_LIST.PENDING.ID :
            {
                key = 'PENDING';
                break;
            }
            case STATUS_LIST.APPROVED.ID :
            {
                key = 'APPROVED';
                break;
            }
            case STATUS_LIST.CANCELED.ID :
            {
                key = 'CANCELED';
                break;
            }
            case STATUS_LIST.REVERTED.ID :
            {
                key = 'REVERTED';
                break;
            }
            case STATUS_LIST.REJECTED.ID :
            {
                key = 'REJECTED';
                break;
            }
            case STATUS_LIST.SUSPENDED.ID :
            {
                key = 'SUSPENDED';
                break;
            }
            case STATUS_LIST.BLACKLISTED.ID :
            {
                key = 'BLACKLISTED';
                break;
            }
            case STATUS_LIST.DELETED.ID :
            {
                key = 'DELETED';
                break;
            }
            case STATUS_LIST.AMENDED.ID :
            {
                key = 'AMENDED';
                break;
            }
            case STATUS_LIST.ACCEPTED.ID :
            {
                key = 'ACCEPTED';
                break;
            }
            case STATUS_LIST.RELEASED.ID :
            {
                key = 'RELEASED';
                break;
            }
            case STATUS_LIST.DISPATCHED.ID :
            {
                key = 'DISPATCHED';
                break;
            }
            case STATUS_LIST.DELIVERED.ID :
            {
                key = 'DELIVERED';
                break;
            }
            case STATUS_LIST.DELIVERY_ACCEPTED.ID :
            {
                key = 'DELIVERY_ACCEPTED';
                break;
            }
            case STATUS_LIST.DELIVERY_REJECTED.ID :
            {
                key = 'DELIVERY_REJECTED';
                break;
            }
            default:
            {
                key = null;
                break;
            }
        }

        if (key) {
            return {
                name: STATUS_LIST[key].NAME,
                style: {color: STATUS_LIST[key].COLOR}
            };
        }else {
            return {
                name: STATUS,
                style: {color: '#000000'}
            };
        }
    }
}
