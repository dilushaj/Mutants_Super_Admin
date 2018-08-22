export class MainConfig {

    public static STATUS_LIST = {
        'CREATED': {
            ID: 0,
            NAME: 'Create',
            COLOR: '#000000'
        },
        'PENDING': {
            ID: 1,
            NAME: 'Pending',
            COLOR: '#0095ff'
        },
        'APPROVED': {
            ID: 2,
            NAME: 'Approved',
            COLOR: '#11c14b'
        },
        'CANCELED': {
            ID: 3,
            NAME: 'Cancel',
            COLOR: '#8B4513'
        },
        'REVERTED': {
            ID: 4,
            NAME: 'Reverted',
            COLOR: '#000000'
        },
        'REJECTED': {
            ID: 5,
            NAME: 'Rejected',
            COLOR: '#dc3545'
        },
        'SUSPENDED': {
            ID: 6,
            NAME: 'Hold',
            COLOR: '#f5a718'
        },
        'BLACKLISTED': {
            ID: 7,
            NAME: 'Blacklisted',
            COLOR: '#000000'
        },
        'DELETED': {
            ID: 8,
            NAME: 'Deleted',
            COLOR: '#ea1212'
        },
        'AMENDED': {
            ID: 9,
            NAME: 'Amended',
            COLOR: '#000000'
        },
        'ACCEPTED': {
            ID: 10,
            NAME: 'Accepted',
            COLOR: '#11c110'
        },
        'RELEASED': {
            ID: 11,
            NAME: 'Prepared',
            COLOR: '#000000'
        },
        'DISPATCHED': {
            ID: 12,
            NAME: 'Dispatched',
            COLOR: '#000000'
        },
        'DELIVERED': {
            ID: 13,
            NAME: 'Delivered',
            COLOR: '#000000'
        },
        'DELIVERY_ACCEPTED': {
            ID: 14,
            NAME: 'Delivery Accepted',
            COLOR: '#000000'
        },
        'DELIVERY_REJECTED': {
            ID: 15,
            NAME: 'Delivery Rejected',
            COLOR: '#000000'
        }
    };

    public static SHOP_CATEGORIES = {
        '1' : 'RESTAURANT',
        '2' : 'ELECTRONICS',
        '3' : 'VEHICLE',
        '4' : 'MEDICAL_EQUIPMENT',
        '5' : 'FURNITURE',
        '6' : 'MOTHER_AND_BABY_CARE',
        '7' : 'FASHION_STORES'
    };
    public static  SHOP_TYPES = {
      '1' : 'PRODUCT',
      '2' : 'SERVICE'
    };

    public static SHOP_DATA_TYPES = {
      '1' : 'LIST',
      '2' : 'FREE TEXT'
    };
  public static CATEGORY_TYPES = [
    {
      'id': 1,
      'key': 'parent_category',
      'value': 'Root Category'
    },
    {
      'id': 2,
      'key': 'child_category',
      'value': 'Child Category'
    }
    ];
  public static PRODUCT_CATEGORY_TYPES = {
    '1': [
      {
        'categoryId': 1,
        'key': 'meal_type',
        'value': 'Meal Type'
      },
      {
        'categoryId': 2,
        'key': 'origin',
        'value': 'Origin'
      }
      ],
    '2': [
      {
        'categoryId': 3,
        'key': 'category',
        'value': 'Category'
      }
      ],
    '3': [
      {
        'categoryId': 4,
        'key': 'brand',
        'value': 'Brand'
      },
      {
        'categoryId': 5,
        'key': 'model',
        'value': 'Model'
      },
      {
        'categoryId': 6,
        'key': 'condition',
        'value': 'Condition'
      },
      {
        'categoryId': 7,
        'key': 'transmission',
        'value': 'Transmission'
      },
      {
        'categoryId': 8,
        'key': 'fuel_type',
        'value': 'Fuel Type'
      },
      {
        'categoryId': 9,
        'key': 'body_type',
        'value': 'Body Type'
      },
      {
        'categoryId': 10,
        'key': 'millage',
        'value': 'Mileage'
      },
      {
        'categoryId': 11,
        'key': 'engine_capacity',
        'value': 'Engine Capacity'
      },
      {
        'categoryId': 12,
        'key': 'year',
        'value': 'Year'
      },
      {
        'categoryId': 13,
        'key': 'type',
        'value': 'Type'
      }
      ],
    '4': [
      {
        'categoryId': 12,
        'key': 'category',
        'value': 'Category'
      }
      ],
    '5': [
      {
        'categoryId': 13,
        'key': 'category',
        'value': 'Category'
      }
      ],
    '6': [
      {
        'categoryId': 14,
        'key': 'brand',
        'value': 'Brand'
      },
      {
        'categoryId': 15,
        'key': 'category',
        'value': 'Category'
      },
      {
        'categoryId': 16,
        'key': 'country',
        'value': 'Country'
      },
      {
        'categoryId': 17,
        'key': 'age_group',
        'value': 'Age Group'
      }
      ],
    '7': [
      {
        'categoryId': 18,
        'key': 'category',
        'value': 'Category'
      }
      ],
    '8': [
      {
        'categoryId': 19,
        'key': 'brand',
        'value': 'Brand'
      },
      {
        'categoryId': 20,
        'key': 'category',
        'value': 'Category'
      }
      ],
    '9': [],
    '10': [
      {
        'categoryId': 21,
        'key': 'vehicle_class',
        'dataType': 'list',
        'value': 'Vehicle Class'
      },
      {
        'categoryId': 22,
        'key': 'condition',
        'dataType': 'list',
        'value': 'Condition'
      },
      {
        'categoryId': 23,
        'key': 'make',
        'dataType': 'list',
        'value': 'Make'
      },
      {
        'categoryId': 24,
        'key': 'model',
        'dataType': 'list',
        'value': 'Model'
      },
      {
        'categoryId': 25,
        'key': 'class_type',
        'dataType': 'list',
        'value': 'Class Type'
      },
      {
        'categoryId': 26,
        'key': 'manufacturing_year',
        'dataType': 'free_text',
        'value': 'Manufacturing Year'
      },
      {
        'categoryId': 27,
        'key': 'manufactured_country',
        'dataType': 'list',
        'value': 'Manufactured Country'
      },
      {
        'categoryId': 28,
        'key': 'registered_year',
        'dataType': 'free_text',
        'value': 'Registered Year'
      },
      {
        'categoryId': 29,
        'key': 'fuel_type',
        'dataType': 'list',
        'value': 'Fuel Type'
      },
      {
        'categoryId': 30,
        'key': 'transmission',
        'dataType': 'list',
        'value': 'Transmission'
      },
      {
        'categoryId': 31,
        'key': 'exterior_color',
        'dataType': 'list',
        'value': 'Exterior Color'
      },
      {
        'categoryId': 32,
        'key': 'interior_color',
        'dataType': 'list',
        'value': 'Interior Color'
      },
      {
        'categoryId': 33,
        'key': 'mileage',
        'dataType': 'free_text',
        'value': 'Mileage'
      },
      {
        'categoryId': 34,
        'key': 'registration_number',
        'dataType': 'free_text',
        'value': 'Registration Number'
      },
      {
        'categoryId': 35,
        'key': 'door_count',
        'dataType': 'list',
        'value': 'Door Count'
      },
      {
        'categoryId': 36,
        'key': 'engine_capacity',
        'dataType': 'free_text',
        'value': 'Engine Capacity'
      },
      {
        'categoryId': 37,
        'key': 'options_features',
        'dataType': 'list',
        'value': 'Options & Features'
      },
      {
        'categoryId': 38,
        'key': 'text_value',
        'dataType': 'list',
        'value': 'Text Value'
      },
      {
        'categoryId': 39,
        'key': 'check_box',
        'dataType': 'list',
        'value': 'Check Box'
      }
      ]
  };
}





