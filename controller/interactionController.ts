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

  async getTodaysPendingCalls(req: Request, res: Response) {
    try {
      const pendingCalls = await interactionService.getTodaysPendingCalls();
      console.log(pendingCalls);
      res.json(pendingCalls);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  async updateFollowUpStatus(req: Request, res: Response): Promise<void> {
    try {
      const interactionId = parseInt(req.params.id, 10);
      const { followUpRequired } = req.body;

      if (isNaN(interactionId)) {
        res.status(400).json({ error: "Invalid interaction ID." });
        return;
      }

      if (typeof followUpRequired !== "boolean") {
        res.status(400).json({ error: "Invalid input for followUpRequired. It must be a boolean." });
        return;
      }

      const updatedInteraction = await interactionService.updateFollowUpStatus(interactionId, followUpRequired);
      res.status(200).json(updatedInteraction);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error occurred." });
    }
  }

}

export default new InteractionController();
