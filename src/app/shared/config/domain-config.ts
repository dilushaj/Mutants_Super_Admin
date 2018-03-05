export class DomainConfig {

    public static FEATURES = {
        PRODUCT_PREPARATION : ["RESTAURANT"],
        PRODUCT_SERVING_POINT : ["RESTAURANT"],
        PRODUCT_CONSUMING_POINT : ["RESTAURANT"]
    };

    public static PROPERTY = {
        PRODUCT_IMG_SIZE: {
            FURNITURE:{
                "WIDTH": 300,
                "HEIGHT": 136
            },
            DEFAULT:{
                "WIDTH": 238,
                "HEIGHT": 238
            }
        },
        PRODUCT_ARRAY_IMG_SIZE: {
            FURNITURE:{
                "WIDTH": 625,
                "HEIGHT": 400
            },
            MOTHER_AND_BABY_CARE:{
                "WIDTH": 625,
                "HEIGHT": 400
            },
            DEFAULT:{
                "WIDTH": 450,
                "HEIGHT": 350
            }
        },
        BANNER_IMG_SIZE: {
            FURNITURE:{
                "WIDTH": 1280,
                "HEIGHT": 460
            },
            DEFAULT:{
                "WIDTH": 1280,
                "HEIGHT": 460
            }
        },
        "CORNER":  {
            "RESTAURANT":[
                {ID : 0, KEY: "PREPARATION", KEY_NAME: "Kitchen"},
                {ID : 1, KEY: "SERVING_POINT", KEY_NAME: "Corner"},
                {ID : 2, KEY: "CONSUMING_POINT", KEY_NAME: "Table"}
            ],
            "VEHICLE": [
                {ID : 0, KEY: "PREPARATION", KEY_NAME: "Preparation"},
                {ID : 1, KEY: "SERVING_POINT", KEY_NAME: "Sales point"}
            ],
            "MEDICAL_EQUIPMENT": [
                {ID : 0, KEY: "PREPARATION", KEY_NAME: "Assembly Point"},
                {ID : 1, KEY: "SERVING_POINT", KEY_NAME: "Sales point"}
            ],
            "FURNITURE": [
                {ID : 0, KEY: "PREPARATION", KEY_NAME: "Assembly Point"},
                {ID : 1, KEY: "SERVING_POINT", KEY_NAME: "Sales point"}
            ],
            "MOTHER_AND_BABY_CARE": [
                {ID : 0, KEY: "PREPARATION", KEY_NAME: "Assembly Point"},
                {ID : 1, KEY: "SERVING_POINT", KEY_NAME: "Sales point"}
            ],
            "FASHION_STORES": [
                {ID : 0, KEY: "PREPARATION", KEY_NAME: "Assembly Point"},
                {ID : 1, KEY: "SERVING_POINT", KEY_NAME: "Sales point"}
            ],
            DEFAULT:[]
        }
    };

}



