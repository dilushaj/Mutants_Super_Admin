export class Branch {
    public analyzeBranch(data : any){
        let branch : any = {
            "channel": data.channel || 0,
            "shopId": data.shopId || 0,
            "branchId": data.branchId || 0,
            "branchName": data.branchName || null,
            "address1": data.address1 || null,
            "address2": data.address2 || null,
            "city": data.city || null,
            "countryId": data.countryId || 0,
            "currency": data.currency || null,
            "postalCode": data.postalCode || null,
            "email": data.email || null,
            "telephone": data.telephone || null,
            "telephone2": data.telephone2 || null,
            "latitude": data.latitude || 0,
            "longitude": data.longitude || 0,
            "openTime": data.openTime || 0,
            "closeTime": data.closeTime || 0,
            "paymentTypes": data.closeTime || [],
            "deliveryOptions": data.closeTime || [],
            "fax": data.fax || null,
            "website": data.website || null,
            "locationUrl": data.locationUrl || null,
            "contactPerson": data.contactPerson || null,
            "contactPersonMobile": data.contactPersonMobile || null,
            "contactPersonTelephone": data.contactPersonTelephone || null,
            "contactPersonEmail": data.contactPersonEmail || null,
        };
        return branch;
    }
}
