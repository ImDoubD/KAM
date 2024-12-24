import Lead from "../model/leadModel";
import { LeadData } from "../types";

class LeadService {
  async createLead(data: LeadData) {
    try {
      if (!data.restaurantName || !data.address || !data.contactNumber || !data.status || !data.assignedKAM) {
        throw new Error("All fields are required.");
      }
      return await Lead.create(data);
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error creating lead: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while creating the lead.");
        }
      }
  }

  async getAllLeads() {
    try {
      return await Lead.findAll();
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching lead: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while fetching the lead.");
        }
      }
  }

  async getLeadById(id: number) {
    try {
      const lead = await Lead.findByPk(id);
      if (!lead) {
        throw new Error("Lead not found.");
      }
      return lead;
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching lead by id: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while fetching the lead.");
        }
      }
  }

  async updateLead(id: number, data: Partial<LeadData>) {
    try {
      const lead = await Lead.findByPk(id);
      if (!lead) {
        throw new Error("Lead not found.");
      }
      return await lead.update(data);
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error updating lead: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while updating the lead.");
        }
      }
  }

  async deleteLead(id: number) {
    try {
      const lead = await Lead.findByPk(id);
      if (!lead) {
        throw new Error("Lead not found.");
      }
      await lead.destroy();
      return { message: "Lead deleted successfully" };
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error deleting lead: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while deleting the lead.");
        }
      }
  }
}

export default new LeadService();
