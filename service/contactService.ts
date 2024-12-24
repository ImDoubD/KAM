import Contact from "../model/contactModel";
import Lead from "../model/leadModel";
import { ContactData } from "../types";

class ContactService {
  async createContact(data: ContactData) {
    try {
        if (!data.name || !data.role || !data.phoneNumber || !data.email || !data.leadId) {
            throw new Error("All fields are required.");
        }
        const leadExists = await Lead.findByPk(data.leadId);
        console.log(leadExists)
        if (!leadExists) {
            throw new Error(`Lead with ID ${data.leadId} does not exist.`);
        }
        return await Contact.create(data);
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error creating contact: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while creating the contact.");
        }
      }
  }

  async getContactsByLeadId(leadId: number) {
    try {
        const leadExists = await Lead.findByPk(leadId);
        if (!leadExists) {
            throw new Error(`Lead with ID ${leadId} does not exist.`);
        }
        return await Contact.findAll({ where: { leadId } });
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching contact: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while fetching the contact.");
        }
      }
  }
}

export default new ContactService();
