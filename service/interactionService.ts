import Interaction from "../model/interactionModel";
import Lead from "../model/leadModel";
import { InteractionData } from "../types";

class InteractionService {
  async createInteraction(data: InteractionData) {
    try {
        if (!data.date || !data.type || !data.notes || data.followUpRequired === undefined || !data.leadId) {
            throw new Error("All fields are required.");
        }
        const leadExists = await Lead.findByPk(data.leadId);
        if (!leadExists) {
            throw new Error(`Lead with ID ${data.leadId} does not exist.`);
        }
        return await Interaction.create(data);
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error creating interaction: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while creating the interaction.");
        }
      }
  }

  async getInteractionsByLeadId(leadId: number) {
    try {
        const leadExists = await Lead.findByPk(leadId);
        if (!leadExists) {
            throw new Error(`Lead with ID ${leadId} does not exist.`);
        }
        return await Interaction.findAll({ where: { leadId } });
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching interaction: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred while fetching the interaction.");
        }
      }
  }
}

export default new InteractionService();
