import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";


interface ContactAttributes {
  id?: number; 
  name: string;
  role: "Owner" | "Manager" | "Other";
  phoneNumber: string;
  email: string;
  leadId: number; // Foreign key
}

// Optional attributes for creation
interface ContactCreationAttributes extends Optional<ContactAttributes, "id"> {}

// Define the model
class Contact extends Model<ContactAttributes, ContactCreationAttributes> {}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    leadId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Contact" }
);

export default Contact;
