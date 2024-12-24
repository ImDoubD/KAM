import { Request, Response } from "express";
import leadService from "../service/leadService";
import { LeadData } from "../types";

class LeadController {
  async createLead(req: Request, res: Response) {
    try {
      const data: LeadData = req.body;
      const lead = await leadService.createLead(data);
      res.status(201).json(lead);
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: "An unknown error occurred" });
        }
      }
  }

  async getLeads(req: Request, res: Response) {
    try {
      const leads = await leadService.getAllLeads();
      res.json(leads);
    } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "An unknown error occurred" });
        }
      }
  }

  async getLead(req: Request, res: Response) {
    try {
      const lead = await leadService.getLeadById(Number(req.params.id));
      res.json(lead);
    } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "An unknown error occurred" });
        }
      }
  }

  async updateLead(req: Request, res: Response) {
    try {
      const data: Partial<LeadData> = req.body;
      const lead = await leadService.updateLead(Number(req.params.id), data);
      res.json(lead);
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: "An unknown error occurred" });
        }
      }
  }

  async deleteLead(req: Request, res: Response) {
    try {
      const result = await leadService.deleteLead(Number(req.params.id));
      res.json(result);
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: "An unknown error occurred" });
        }
      }
  }
}

export default new LeadController();
