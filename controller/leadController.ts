import { Request, Response } from "express";
import leadService from "../service/leadService";
import { LeadData } from "../types";

class LeadController {
  async createLead(req: Request, res: Response) {
    try {
      console.log("hello 1")
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
      console.log("hello 2")
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
      console.log("hello 3")
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
      console.log("hello 4")
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
      console.log("hello 5")
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

  async searchLeads(req: Request, res: Response) {
    try {
      console.log("hello 6")
      const query = req.query.query as string;
      const status = req.query.status as string;
      const assignedKAM = req.query.assignedKAM as string;
  
      console.log("Query Params:", req.query);
      const result = await leadService.searchLeads(
        query,
        status,
        assignedKAM
      );
  
      res.json(result);
    } catch (error) {
      console.error("Error in searchLeads:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error occurred" });
    }
  }
  
}

export default new LeadController();
