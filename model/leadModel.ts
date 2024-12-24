import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";


interface LeadAttributes {
  id: number;
  restaurantName: string;
  address: string;
  contactNumber: string;
  status: "New" | "Active" | "Inactive";
  assignedKAM: string;
}

// Define creation attributes (id is optional during creation)
interface LeadCreationAttributes extends Optional<LeadAttributes, "id"> {}

// Create the Lead model
class Lead extends Model<LeadAttributes, LeadCreationAttributes> {}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantName: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    contactNumber: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("New", "Active", "Inactive"), allowNull: false },
    assignedKAM: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Lead" }
);

export default Lead;
