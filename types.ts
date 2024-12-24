export interface LeadData {
    restaurantName: string;
    address: string;
    contactNumber: string;
    status: "New" | "Active" | "Inactive";
    assignedKAM: string;
  }
  
  export interface ContactData {
    name: string;
    role: "Owner" | "Manager" | "Other";
    phoneNumber: string;
    email: string;
    leadId: number; // Foreign key for the associated lead
  }
  
  export interface InteractionData {
    date: string; 
    type: "Call" | "Visit" | "Order";
    notes: string;
    followUpRequired: boolean;
    leadId: number; // Foreign key for the associated lead
  }
  