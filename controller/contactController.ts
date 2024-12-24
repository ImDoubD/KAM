import { Request, Response } from "express";
import contactService from "../service/contactService";
import { ContactData } from "../types";

class ContactController {
  async createContact(req: Request, res: Response) {
    try {
      const data: ContactData = req.body;
      const contact = await contactService.createContact(data);
      res.status(201).json(contact);
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: "An unknown error occurred" });
        }
      }
  }

  async getContacts(req: Request, res: Response) {
    try {
      const contacts = await contactService.getContactsByLeadId(Number(req.params.leadId));
      res.json(contacts);
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: "An unknown error occurred" });
        }
      }
  }
}

export default new ContactController();
