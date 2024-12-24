import { Request, Response } from "express";
import interactionService from "../service/interactionService";
import { InteractionData } from "../types";

class InteractionController {
  async createInteraction(req: Request, res: Response) {
    try {
      const data: InteractionData = req.body;
      const interaction = await interactionService.createInteraction(data);
      res.status(201).json(interaction);
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: "An unknown error occurred" });
        }
      }
  }

  async getInteractions(req: Request, res: Response) {
    try {
      const interactions = await interactionService.getInteractionsByLeadId(Number(req.params.leadId));
      res.json(interactions);
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: "An unknown error occurred" });
        }
      }
  }
}

export default new InteractionController();
