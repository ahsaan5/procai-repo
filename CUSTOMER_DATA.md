# ProcAI Sample Customer Data

## Customer 1: John Smith (Billing Dispute - Roaming Charges)

### Customer Profile
```json
{
  "customer_id": "TC-887234",
  "personal_info": {
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@email.com",
    "phone_primary": "(555) 234-8877",
    "phone_alternate": "(555) 234-8878",
    "date_of_birth": "1985-06-15",
    "address": {
      "street": "142 West 57th Street",
      "unit": "Apt 12B",
      "city": "New York",
      "state": "NY",
      "zip": "10019"
    }
  },
  "account_info": {
    "account_number": "TC-887234",
    "account_status": "ACTIVE",
    "account_type": "Individual",
    "customer_since": "2021-03-12",
    "tenure_months": 38,
    "credit_class": "A",
    "autopay_enabled": true,
    "paperless_billing": true
  },
  "plan_info": {
    "plan_name": "Unlimited Plus",
    "plan_code": "UNL-PLUS-5G",
    "monthly_cost": 89.99,
    "data_allowance": "Unlimited",
    "hotspot_data": "50GB",
    "international_calling": false,
    "international_roaming": false,
    "plan_features": [
      "5G Access",
      "HD Streaming",
      "Mobile Hotspot",
      "Unlimited Talk & Text"
    ]
  },
  "device_info": {
    "manufacturer": "Apple",
    "model": "iPhone 14 Pro",
    "imei": "359245109876543",
    "purchase_date": "2023-09-20",
    "warranty_status": "ACTIVE",
    "warranty_expiry": "2025-09-20",
    "device_protection_plan": false,
    "estimated_value": 999.00
  },
  "usage_current_cycle": {
    "cycle_start": "2024-05-01",
    "cycle_end": "2024-05-31",
    "data_used_gb": 34.2,
    "voice_minutes": 847,
    "sms_sent": 1243,
    "international_usage": {
      "roaming_data_gb": 2.3,
      "roaming_voice_min": 47,
      "roaming_sms": 23,
      "roaming_country": "Canada",
      "roaming_dates": "2024-05-08 to 2024-05-12"
    }
  }
}
```

### Billing History
```json
{
  "customer_id": "TC-887234",
  "billing_history": [
    {
      "bill_date": "2024-05-15",
      "due_date": "2024-05-30",
      "statement_period": "2024-05-01 to 2024-05-31",
      "status": "UNPAID",
      "total_amount": 156.43,
      "breakdown": {
        "plan_charges": 89.99,
        "device_charges": 0.00,
        "roaming_charges": 67.44,
        "taxes_fees": -1.00
      },
      "roaming_details": {
        "data_charges": 45.50,
        "voice_charges": 18.80,
        "sms_charges": 3.14,
        "total": 67.44
      }
    },
    {
      "bill_date": "2024-04-15",
      "due_date": "2024-04-30",
      "statement_period": "2024-04-01 to 2024-04-30",
      "status": "PAID",
      "payment_date": "2024-04-22",
      "total_amount": 89.99,
      "breakdown": {
        "plan_charges": 89.99,
        "device_charges": 0.00,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    },
    {
      "bill_date": "2024-03-15",
      "due_date": "2024-03-30",
      "statement_period": "2024-03-01 to 2024-03-31",
      "status": "PAID",
      "payment_date": "2024-03-20",
      "total_amount": 89.99,
      "breakdown": {
        "plan_charges": 89.99,
        "device_charges": 0.00,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    }
  ],
  "payment_method": {
    "type": "CREDIT_CARD",
    "card_type": "Visa",
    "last_four": "4532",
    "autopay": true
  }
}
```

### Recent Ticket History
```json
{
  "customer_id": "TC-887234",
  "tickets": [
    {
      "ticket_id": "TKT-445821",
      "created_date": "2024-03-28",
      "closed_date": "2024-03-28",
      "category": "TECHNICAL",
      "sub_category": "DATA_SPEED",
      "priority": "MEDIUM",
      "status": "CLOSED",
      "summary": "Customer reported slow data speeds in midtown Manhattan",
      "resolution": "Tower maintenance in area. Speeds restored within 2 hours. Customer satisfied.",
      "handle_time_seconds": 420,
      "first_call_resolution": true,
      "customer_satisfaction": 4
    },
    {
      "ticket_id": "TKT-398234",
      "created_date": "2023-12-10",
      "closed_date": "2023-12-10",
      "category": "BILLING",
      "sub_category": "PAYMENT_ISSUE",
      "priority": "LOW",
      "status": "CLOSED",
      "summary": "Customer requested to update credit card on file",
      "resolution": "Updated payment method successfully",
      "handle_time_seconds": 180,
      "first_call_resolution": true,
      "customer_satisfaction": 5
    },
    {
      "ticket_id": "TKT-287654",
      "created_date": "2023-09-22",
      "closed_date": "2023-09-22",
      "category": "SALES",
      "sub_category": "DEVICE_UPGRADE",
      "priority": "LOW",
      "status": "CLOSED",
      "summary": "Customer inquired about iPhone 14 Pro upgrade options",
      "resolution": "Customer upgraded to iPhone 14 Pro with trade-in discount",
      "handle_time_seconds": 960,
      "first_call_resolution": true,
      "customer_satisfaction": 5
    }
  ]
}
```

### CRM Activity Log
```json
{
  "customer_id": "TC-887234",
  "recent_interactions": [
    {
      "date": "2024-05-15",
      "type": "INBOUND_CALL",
      "duration_seconds": 392,
      "agent": "Sarah Mitchell",
      "summary": "Current call - billing inquiry (roaming charges)",
      "sentiment": "FRUSTRATED",
      "notes": "Customer unaware of roaming charges from Canada trip"
    },
    {
      "date": "2024-03-28",
      "type": "INBOUND_CALL",
      "duration_seconds": 420,
      "agent": "Mike Rodriguez",
      "summary": "Data speed complaint",
      "sentiment": "NEUTRAL",
      "notes": "Tower maintenance causing slowdown. Issue resolved."
    },
    {
      "date": "2024-02-14",
      "type": "CHAT",
      "duration_seconds": 180,
      "agent": "Lisa Chen",
      "summary": "General account question",
      "sentiment": "POSITIVE",
      "notes": "Asked about data usage. Provided breakdown."
    }
  ]
}
```

### Network Status (Customer Location)
```json
{
  "location": {
    "city": "New York",
    "state": "NY",
    "zip": "10019",
    "area": "Midtown Manhattan"
  },
  "network_status": {
    "status": "NORMAL",
    "5g_available": true,
    "lte_available": true,
    "current_speed_mbps": 145,
    "signal_strength": "EXCELLENT",
    "tower_id": "NYC-MID-087",
    "tower_distance_miles": 0.3
  },
  "known_issues": [],
  "scheduled_maintenance": [],
  "recent_outages": [
    {
      "date": "2024-03-28",
      "duration_hours": 2,
      "impact": "Reduced speeds",
      "cause": "Tower maintenance"
    }
  ]
}
```

---

## Customer 2: Maria Rodriguez (Network Outage Complaint)

### Customer Profile
```json
{
  "customer_id": "TC-923461",
  "personal_info": {
    "first_name": "Maria",
    "last_name": "Rodriguez",
    "email": "m.rodriguez82@gmail.com",
    "phone_primary": "(555) 876-4321",
    "phone_alternate": null,
    "date_of_birth": "1982-11-03",
    "address": {
      "street": "8542 Sunset Boulevard",
      "unit": null,
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90069"
    }
  },
  "account_info": {
    "account_number": "TC-923461",
    "account_status": "ACTIVE",
    "account_type": "Individual",
    "customer_since": "2019-07-22",
    "tenure_months": 58,
    "credit_class": "A",
    "autopay_enabled": true,
    "paperless_billing": true
  },
  "plan_info": {
    "plan_name": "Unlimited Premium",
    "plan_code": "UNL-PREM-5G",
    "monthly_cost": 99.99,
    "data_allowance": "Unlimited",
    "hotspot_data": "100GB",
    "international_calling": true,
    "international_roaming": true,
    "plan_features": [
      "5G Ultra Wideband",
      "4K UHD Streaming",
      "Premium Mobile Hotspot",
      "Global Calling & Texting",
      "International Roaming Included"
    ]
  },
  "device_info": {
    "manufacturer": "Samsung",
    "model": "Galaxy S24 Ultra",
    "imei": "352867104523876",
    "purchase_date": "2024-02-10",
    "warranty_status": "ACTIVE",
    "warranty_expiry": "2026-02-10",
    "device_protection_plan": true,
    "device_protection_cost": 14.99,
    "estimated_value": 1199.00
  },
  "usage_current_cycle": {
    "cycle_start": "2024-05-01",
    "cycle_end": "2024-05-31",
    "data_used_gb": 87.4,
    "voice_minutes": 1243,
    "sms_sent": 892,
    "international_usage": null
  }
}
```

### Billing History
```json
{
  "customer_id": "TC-923461",
  "billing_history": [
    {
      "bill_date": "2024-05-15",
      "due_date": "2024-05-30",
      "statement_period": "2024-05-01 to 2024-05-31",
      "status": "UNPAID",
      "total_amount": 114.98,
      "breakdown": {
        "plan_charges": 99.99,
        "device_charges": 0.00,
        "device_protection": 14.99,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    },
    {
      "bill_date": "2024-04-15",
      "due_date": "2024-04-30",
      "statement_period": "2024-04-01 to 2024-04-30",
      "status": "PAID",
      "payment_date": "2024-04-18",
      "total_amount": 114.98,
      "breakdown": {
        "plan_charges": 99.99,
        "device_charges": 0.00,
        "device_protection": 14.99,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    },
    {
      "bill_date": "2024-03-15",
      "due_date": "2024-03-30",
      "statement_period": "2024-03-01 to 2024-03-31",
      "status": "PAID",
      "payment_date": "2024-03-17",
      "total_amount": 114.98,
      "breakdown": {
        "plan_charges": 99.99,
        "device_charges": 0.00,
        "device_protection": 14.99,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    }
  ],
  "payment_method": {
    "type": "CHECKING_ACCOUNT",
    "bank_name": "Chase Bank",
    "last_four": "7821",
    "autopay": true
  }
}
```

### Recent Ticket History
```json
{
  "customer_id": "TC-923461",
  "tickets": [
    {
      "ticket_id": "TKT-556743",
      "created_date": "2024-05-15",
      "closed_date": null,
      "category": "TECHNICAL",
      "sub_category": "NO_SERVICE",
      "priority": "CRITICAL",
      "status": "IN_PROGRESS",
      "summary": "Customer reporting complete loss of service in West Hollywood area",
      "resolution": "In progress - tower outage confirmed",
      "handle_time_seconds": null,
      "first_call_resolution": false,
      "customer_satisfaction": null
    },
    {
      "ticket_id": "TKT-487632",
      "created_date": "2024-02-10",
      "closed_date": "2024-02-10",
      "category": "SALES",
      "sub_category": "DEVICE_PURCHASE",
      "priority": "LOW",
      "status": "CLOSED",
      "summary": "Customer purchased Samsung Galaxy S24 Ultra",
      "resolution": "Device activated successfully. Customer satisfied.",
      "handle_time_seconds": 720,
      "first_call_resolution": true,
      "customer_satisfaction": 5
    },
    {
      "ticket_id": "TKT-321098",
      "created_date": "2023-11-20",
      "closed_date": "2023-11-22",
      "category": "TECHNICAL",
      "sub_category": "VOICEMAIL_ISSUE",
      "priority": "MEDIUM",
      "status": "CLOSED",
      "summary": "Voicemail not working properly",
      "resolution": "Reset voicemail password. Issue resolved.",
      "handle_time_seconds": 540,
      "first_call_resolution": false,
      "customer_satisfaction": 4
    }
  ]
}
```

### CRM Activity Log
```json
{
  "customer_id": "TC-923461",
  "recent_interactions": [
    {
      "date": "2024-05-15",
      "type": "INBOUND_CALL",
      "duration_seconds": 485,
      "agent": "Sarah Mitchell",
      "summary": "Current call - no service complaint",
      "sentiment": "ANGRY",
      "notes": "Customer has no service for 3+ hours. Works from home and needs connectivity urgently."
    },
    {
      "date": "2024-02-10",
      "type": "STORE_VISIT",
      "duration_seconds": 1800,
      "agent": "Store Rep - David Kim",
      "summary": "Device upgrade to Galaxy S24 Ultra",
      "sentiment": "POSITIVE",
      "notes": "Smooth transaction. Customer excited about new device."
    },
    {
      "date": "2023-11-20",
      "type": "INBOUND_CALL",
      "duration_seconds": 540,
      "agent": "Tom Anderson",
      "summary": "Voicemail issue",
      "sentiment": "NEUTRAL",
      "notes": "Voicemail not retrieving messages. Reset needed."
    }
  ]
}
```

### Network Status (Customer Location)
```json
{
  "location": {
    "city": "Los Angeles",
    "state": "CA",
    "zip": "90069",
    "area": "West Hollywood"
  },
  "network_status": {
    "status": "OUTAGE",
    "5g_available": false,
    "lte_available": false,
    "current_speed_mbps": 0,
    "signal_strength": "NO_SERVICE",
    "tower_id": "LAX-WHD-043",
    "tower_distance_miles": 0.8
  },
  "known_issues": [
    {
      "issue_id": "OUT-20240515-043",
      "severity": "CRITICAL",
      "start_time": "2024-05-15 11:42 AM PST",
      "estimated_resolution": "2024-05-15 4:00 PM PST",
      "affected_services": ["Voice", "Data", "SMS"],
      "cause": "Power outage at tower site",
      "customers_affected": 2847,
      "status": "REPAIR_IN_PROGRESS"
    }
  ],
  "scheduled_maintenance": [],
  "recent_outages": [
    {
      "date": "2024-02-08",
      "duration_hours": 1.5,
      "impact": "Complete outage",
      "cause": "Equipment failure"
    }
  ]
}
```

---

## Customer 3: David Chen (SIM Card Activation)

### Customer Profile
```json
{
  "customer_id": "TC-104529",
  "personal_info": {
    "first_name": "David",
    "last_name": "Chen",
    "email": "david.chen.tech@outlook.com",
    "phone_primary": "(555) 432-1987",
    "phone_alternate": null,
    "date_of_birth": "1995-04-22",
    "address": {
      "street": "450 Park Avenue South",
      "unit": "Unit 5A",
      "city": "New York",
      "state": "NY",
      "zip": "10016"
    }
  },
  "account_info": {
    "account_number": "TC-104529",
    "account_status": "ACTIVE",
    "account_type": "Individual",
    "customer_since": "2024-05-15",
    "tenure_months": 0,
    "credit_class": "B",
    "autopay_enabled": false,
    "paperless_billing": true
  },
  "plan_info": {
    "plan_name": "Unlimited Essential",
    "plan_code": "UNL-ESS-5G",
    "monthly_cost": 65.00,
    "data_allowance": "Unlimited",
    "hotspot_data": "12GB",
    "international_calling": false,
    "international_roaming": false,
    "plan_features": [
      "5G Access",
      "SD Streaming",
      "Limited Mobile Hotspot",
      "Unlimited Talk & Text"
    ]
  },
  "device_info": {
    "manufacturer": "Google",
    "model": "Pixel 8",
    "imei": "354378092847561",
    "purchase_date": "2024-05-15",
    "purchase_method": "BRING_YOUR_OWN_DEVICE",
    "warranty_status": "MANUFACTURER_WARRANTY",
    "warranty_expiry": "2025-10-04",
    "device_protection_plan": false,
    "estimated_value": 699.00
  },
  "usage_current_cycle": {
    "cycle_start": "2024-05-15",
    "cycle_end": "2024-06-14",
    "data_used_gb": 0.0,
    "voice_minutes": 0,
    "sms_sent": 0,
    "international_usage": null
  }
}
```

### Billing History
```json
{
  "customer_id": "TC-104529",
  "billing_history": [
    {
      "bill_date": "2024-05-15",
      "due_date": "2024-05-30",
      "statement_period": "2024-05-15 to 2024-06-14",
      "status": "UNPAID",
      "total_amount": 65.00,
      "breakdown": {
        "plan_charges": 65.00,
        "device_charges": 0.00,
        "activation_fee": 0.00,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      },
      "notes": "First bill - prorated from activation date"
    }
  ],
  "payment_method": {
    "type": "CREDIT_CARD",
    "card_type": "MasterCard",
    "last_four": "8832",
    "autopay": false
  }
}
```

### Recent Ticket History
```json
{
  "customer_id": "TC-104529",
  "tickets": [
    {
      "ticket_id": "TKT-667890",
      "created_date": "2024-05-15",
      "closed_date": null,
      "category": "TECHNICAL",
      "sub_category": "ACTIVATION",
      "priority": "HIGH",
      "status": "IN_PROGRESS",
      "summary": "New customer activation - SIM card not activating",
      "resolution": "In progress - troubleshooting activation",
      "handle_time_seconds": null,
      "first_call_resolution": null,
      "customer_satisfaction": null
    }
  ]
}
```

### CRM Activity Log
```json
{
  "customer_id": "TC-104529",
  "recent_interactions": [
    {
      "date": "2024-05-15",
      "type": "INBOUND_CALL",
      "duration_seconds": null,
      "agent": "Sarah Mitchell",
      "summary": "Current call - SIM activation issue",
      "sentiment": "NEUTRAL",
      "notes": "New customer trying to activate service with BYOD"
    },
    {
      "date": "2024-05-15",
      "type": "ONLINE_SIGNUP",
      "duration_seconds": 420,
      "agent": "SELF_SERVICE",
      "summary": "Customer signed up online for Unlimited Essential plan",
      "sentiment": "POSITIVE",
      "notes": "BYOD activation initiated"
    }
  ]
}
```

### Network Status (Customer Location)
```json
{
  "location": {
    "city": "New York",
    "state": "NY",
    "zip": "10016",
    "area": "Gramercy Park"
  },
  "network_status": {
    "status": "NORMAL",
    "5g_available": true,
    "lte_available": true,
    "current_speed_mbps": 178,
    "signal_strength": "EXCELLENT",
    "tower_id": "NYC-GRM-024",
    "tower_distance_miles": 0.2
  },
  "known_issues": [],
  "scheduled_maintenance": [],
  "recent_outages": []
}
```

---

## Customer 4: Patricia Johnson (Device Not Working)

### Customer Profile
```json
{
  "customer_id": "TC-776234",
  "personal_info": {
    "first_name": "Patricia",
    "last_name": "Johnson",
    "email": "pjohnson1967@yahoo.com",
    "phone_primary": "(555) 654-7890",
    "phone_alternate": "(555) 654-7891",
    "date_of_birth": "1967-09-12",
    "address": {
      "street": "2341 Oak Street",
      "unit": null,
      "city": "Chicago",
      "state": "IL",
      "zip": "60614"
    }
  },
  "account_info": {
    "account_number": "TC-776234",
    "account_status": "ACTIVE",
    "account_type": "Individual",
    "customer_since": "2016-01-05",
    "tenure_months": 100,
    "credit_class": "A+",
    "autopay_enabled": true,
    "paperless_billing": false
  },
  "plan_info": {
    "plan_name": "Unlimited Plus",
    "plan_code": "UNL-PLUS-5G",
    "monthly_cost": 89.99,
    "data_allowance": "Unlimited",
    "hotspot_data": "50GB",
    "international_calling": false,
    "international_roaming": false,
    "plan_features": [
      "5G Access",
      "HD Streaming",
      "Mobile Hotspot",
      "Unlimited Talk & Text"
    ]
  },
  "device_info": {
    "manufacturer": "Apple",
    "model": "iPhone 12",
    "imei": "356789012345678",
    "purchase_date": "2020-11-15",
    "warranty_status": "EXPIRED",
    "warranty_expiry": "2022-11-15",
    "device_protection_plan": true,
    "device_protection_cost": 11.99,
    "estimated_value": 399.00,
    "device_age_months": 42
  },
  "usage_current_cycle": {
    "cycle_start": "2024-05-01",
    "cycle_end": "2024-05-31",
    "data_used_gb": 12.8,
    "voice_minutes": 423,
    "sms_sent": 234,
    "international_usage": null
  }
}
```

### Billing History
```json
{
  "customer_id": "TC-776234",
  "billing_history": [
    {
      "bill_date": "2024-05-15",
      "due_date": "2024-05-30",
      "statement_period": "2024-05-01 to 2024-05-31",
      "status": "UNPAID",
      "total_amount": 101.98,
      "breakdown": {
        "plan_charges": 89.99,
        "device_charges": 0.00,
        "device_protection": 11.99,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    },
    {
      "bill_date": "2024-04-15",
      "due_date": "2024-04-30",
      "statement_period": "2024-04-01 to 2024-04-30",
      "status": "PAID",
      "payment_date": "2024-04-20",
      "total_amount": 101.98,
      "breakdown": {
        "plan_charges": 89.99,
        "device_charges": 0.00,
        "device_protection": 11.99,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    },
    {
      "bill_date": "2024-03-15",
      "due_date": "2024-03-30",
      "statement_period": "2024-03-01 to 2024-03-31",
      "status": "PAID",
      "payment_date": "2024-03-19",
      "total_amount": 101.98,
      "breakdown": {
        "plan_charges": 89.99,
        "device_charges": 0.00,
        "device_protection": 11.99,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    }
  ],
  "payment_method": {
    "type": "CREDIT_CARD",
    "card_type": "Discover",
    "last_four": "1122",
    "autopay": true
  }
}
```

### Recent Ticket History
```json
{
  "customer_id": "TC-776234",
  "tickets": [
    {
      "ticket_id": "TKT-778901",
      "created_date": "2024-05-15",
      "closed_date": null,
      "category": "TECHNICAL",
      "sub_category": "DEVICE_ISSUE",
      "priority": "HIGH",
      "status": "IN_PROGRESS",
      "summary": "Customer reports iPhone 12 won't turn on after iOS update",
      "resolution": "In progress - troubleshooting device",
      "handle_time_seconds": null,
      "first_call_resolution": null,
      "customer_satisfaction": null
    },
    {
      "ticket_id": "TKT-665432",
      "created_date": "2024-01-18",
      "closed_date": "2024-01-18",
      "category": "TECHNICAL",
      "sub_category": "EMAIL_SETUP",
      "priority": "LOW",
      "status": "CLOSED",
      "summary": "Help setting up email on iPhone",
      "resolution": "Walked customer through email setup process",
      "handle_time_seconds": 840,
      "first_call_resolution": true,
      "customer_satisfaction": 5
    },
    {
      "ticket_id": "TKT-554321",
      "created_date": "2023-08-22",
      "closed_date": "2023-08-22",
      "category": "BILLING",
      "sub_category": "BILL_EXPLANATION",
      "priority": "LOW",
      "status": "CLOSED",
      "summary": "Question about device protection charge",
      "resolution": "Explained device protection benefits. Customer satisfied.",
      "handle_time_seconds": 360,
      "first_call_resolution": true,
      "customer_satisfaction": 5
    }
  ]
}
```

### CRM Activity Log
```json
{
  "customer_id": "TC-776234",
  "recent_interactions": [
    {
      "date": "2024-05-15",
      "type": "INBOUND_CALL",
      "duration_seconds": null,
      "agent": "Sarah Mitchell",
      "summary": "Current call - device not turning on",
      "sentiment": "WORRIED",
      "notes": "iPhone 12 won't turn on after iOS update last night. Customer anxious about losing data."
    },
    {
      "date": "2024-01-18",
      "type": "INBOUND_CALL",
      "duration_seconds": 840,
      "agent": "Jennifer Lee",
      "summary": "Email setup assistance",
      "sentiment": "POSITIVE",
      "notes": "Patient customer. Successfully configured email."
    },
    {
      "date": "2023-08-22",
      "type": "INBOUND_CALL",
      "duration_seconds": 360,
      "agent": "Mark Stevens",
      "summary": "Billing question",
      "sentiment": "NEUTRAL",
      "notes": "Routine inquiry about charges"
    }
  ]
}
```

### Network Status (Customer Location)
```json
{
  "location": {
    "city": "Chicago",
    "state": "IL",
    "zip": "60614",
    "area": "Lincoln Park"
  },
  "network_status": {
    "status": "NORMAL",
    "5g_available": true,
    "lte_available": true,
    "current_speed_mbps": 132,
    "signal_strength": "GOOD",
    "tower_id": "CHI-LNP-056",
    "tower_distance_miles": 0.5
  },
  "known_issues": [],
  "scheduled_maintenance": [],
  "recent_outages": []
}
```

---

## Customer 5: Marcus Williams (Plan Upgrade Inquiry)

### Customer Profile
```json
{
  "customer_id": "TC-334876",
  "personal_info": {
    "first_name": "Marcus",
    "last_name": "Williams",
    "email": "m.williams.consulting@gmail.com",
    "phone_primary": "(555) 789-3456",
    "phone_alternate": null,
    "date_of_birth": "1988-12-30",
    "address": {
      "street": "7845 Peachtree Street NE",
      "unit": "Suite 200",
      "city": "Atlanta",
      "state": "GA",
      "zip": "30309"
    }
  },
  "account_info": {
    "account_number": "TC-334876",
    "account_status": "ACTIVE",
    "account_type": "Business",
    "customer_since": "2022-06-10",
    "tenure_months": 23,
    "credit_class": "A",
    "autopay_enabled": true,
    "paperless_billing": true
  },
  "plan_info": {
    "plan_name": "Unlimited Essential",
    "plan_code": "UNL-ESS-5G",
    "monthly_cost": 65.00,
    "data_allowance": "Unlimited",
    "hotspot_data": "12GB",
    "international_calling": false,
    "international_roaming": false,
    "plan_features": [
      "5G Access",
      "SD Streaming",
      "Limited Mobile Hotspot",
      "Unlimited Talk & Text"
    ]
  },
  "device_info": {
    "manufacturer": "Apple",
    "model": "iPhone 15 Pro Max",
    "imei": "358967104523456",
    "purchase_date": "2023-10-05",
    "warranty_status": "ACTIVE",
    "warranty_expiry": "2025-10-05",
    "device_protection_plan": false,
    "estimated_value": 1199.00
  },
  "usage_current_cycle": {
    "cycle_start": "2024-05-01",
    "cycle_end": "2024-05-31",
    "data_used_gb": 156.7,
    "voice_minutes": 2847,
    "sms_sent": 432,
    "hotspot_usage_gb": 12.0,
    "international_usage": null,
    "usage_alerts": [
      {
        "type": "HOTSPOT_LIMIT_REACHED",
        "date": "2024-05-12",
        "message": "Hotspot data limit reached. Speeds reduced."
      }
    ]
  }
}
```

### Billing History
```json
{
  "customer_id": "TC-334876",
  "billing_history": [
    {
      "bill_date": "2024-05-15",
      "due_date": "2024-05-30",
      "statement_period": "2024-05-01 to 2024-05-31",
      "status": "UNPAID",
      "total_amount": 65.00,
      "breakdown": {
        "plan_charges": 65.00,
        "device_charges": 0.00,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    },
    {
      "bill_date": "2024-04-15",
      "due_date": "2024-04-30",
      "statement_period": "2024-04-01 to 2024-04-30",
      "status": "PAID",
      "payment_date": "2024-04-16",
      "total_amount": 65.00,
      "breakdown": {
        "plan_charges": 65.00,
        "device_charges": 0.00,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    },
    {
      "bill_date": "2024-03-15",
      "due_date": "2024-03-30",
      "statement_period": "2024-03-01 to 2024-03-31",
      "status": "PAID",
      "payment_date": "2024-03-15",
      "total_amount": 65.00,
      "breakdown": {
        "plan_charges": 65.00,
        "device_charges": 0.00,
        "other_charges": 0.00,
        "taxes_fees": 0.00
      }
    }
  ],
  "payment_method": {
    "type": "BUSINESS_CARD",
    "card_type": "American Express",
    "last_four": "5009",
    "autopay": true
  }
}
```

### Recent Ticket History
```json
{
  "customer_id": "TC-334876",
  "tickets": [
    {
      "ticket_id": "TKT-889012",
      "created_date": "2024-05-15",
      "closed_date": null,
      "category": "SALES",
      "sub_category": "PLAN_UPGRADE",
      "priority": "MEDIUM",
      "status": "IN_PROGRESS",
      "summary": "Customer inquiring about upgrading to plan with more hotspot data",
      "resolution": "In progress - presenting plan options",
      "handle_time_seconds": null,
      "first_call_resolution": null,
      "customer_satisfaction": null
    },
    {
      "ticket_id": "TKT-723456",
      "created_date": "2024-03-02",
      "closed_date": "2024-03-02",
      "category": "BILLING",
      "sub_category": "BUSINESS_TAX_ID",
      "priority": "LOW",
      "status": "CLOSED",
      "summary": "Update business tax ID for account",
      "resolution": "Updated tax ID information successfully",
      "handle_time_seconds": 240,
      "first_call_resolution": true,
      "customer_satisfaction": 5
    },
    {
      "ticket_id": "TKT-667788",
      "created_date": "2023-10-05",
      "closed_date": "2023-10-05",
      "category": "SALES",
      "sub_category": "DEVICE_UPGRADE",
      "priority": "MEDIUM",
      "status": "CLOSED",
      "summary": "Upgraded to iPhone 15 Pro Max",
      "resolution": "Device upgrade completed successfully",
      "handle_time_seconds": 780,
      "first_call_resolution": true,
      "customer_satisfaction": 5
    }
  ]
}
```

### CRM Activity Log
```json
{
  "customer_id": "TC-334876",
  "recent_interactions": [
    {
      "date": "2024-05-15",
      "type": "INBOUND_CALL",
      "duration_seconds": null,
      "agent": "Sarah Mitchell",
      "summary": "Current call - plan upgrade inquiry",
      "sentiment": "POSITIVE",
      "notes": "Business customer needs more hotspot data for work. Professional and efficient."
    },
    {
      "date": "2024-05-12",
      "type": "AUTOMATED_ALERT",
      "duration_seconds": null,
      "agent": "SYSTEM",
      "summary": "Hotspot data limit reached",
      "sentiment": "NEUTRAL",
      "notes": "SMS alert sent to customer about hotspot limit"
    },
    {
      "date": "2024-03-02",
      "type": "CHAT",
      "duration_seconds": 240,
      "agent": "Online Support - Alex Rivera",
      "summary": "Update business tax ID",
      "sentiment": "NEUTRAL",
      "notes": "Quick and easy update"
    }
  ]
}
```

### Network Status (Customer Location)
```json
{
  "location": {
    "city": "Atlanta",
    "state": "GA",
    "zip": "30309",
    "area": "Midtown"
  },
  "network_status": {
    "status": "NORMAL",
    "5g_available": true,
    "lte_available": true,
    "current_speed_mbps": 167,
    "signal_strength": "EXCELLENT",
    "tower_id": "ATL-MID-032",
    "tower_distance_miles": 0.4
  },
  "known_issues": [],
  "scheduled_maintenance": [
    {
      "scheduled_date": "2024-05-20",
      "time_window": "2:00 AM - 6:00 AM EST",
      "expected_impact": "Possible brief service interruptions",
      "reason": "Tower equipment upgrade"
    }
  ],
  "recent_outages": []
}
```
