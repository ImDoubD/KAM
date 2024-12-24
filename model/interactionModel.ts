import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";


interface InteractionAttributes {
  id?: number;
  date: string; 
  type: "Call" | "Visit" | "Order";
  notes?: string; 
  followUpRequired: boolean;
  leadId: number; // Foreign key
}

// Optional attributes for creation
interface InteractionCreationAttributes extends Optional<InteractionAttributes, "id"> {}

// Define the model
class Interaction extends Model<InteractionAttributes, InteractionCreationAttributes> {}

Interaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: { type: DataTypes.DATE, allowNull: false },
    type: { type: DataTypes.ENUM("Call", "Visit", "Order"), allowNull: false },
    notes: { type: DataTypes.STRING, allowNull: true },
    followUpRequired: { type: DataTypes.BOOLEAN, allowNull: false },
    leadId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Interaction" }
);

export default Interaction;
