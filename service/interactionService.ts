import Interaction from "../model/interactionModel";
import Lead from "../model/leadModel";
import { InteractionData } from "../types";
import { Op } from "sequelize";

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

  async getTodaysPendingCalls() {
    const today = new Date().toISOString().split("T")[0];
  const startOfDay = new Date(`${today}T00:00:00.000Z`);
  const endOfDay = new Date(`${today}T23:59:59.999Z`);

  console.log("Filters applied: startOfDay =", startOfDay, ", endOfDay =", endOfDay);

  const pendingCalls = await Interaction.findAll({
    where: {
      type: "Call",
      followUpRequired: true,
      date: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });

    return pendingCalls;
  }

  async updateFollowUpStatus(interactionId: number, followUpRequired: boolean) {
    const interaction = await Interaction.findByPk(interactionId);

    if (!interaction) {
      throw new Error("Interaction not found.");
    }

    interaction.followUpRequired = followUpRequired;
    await interaction.save();
    return interaction;
  }

}

export default new InteractionService();
