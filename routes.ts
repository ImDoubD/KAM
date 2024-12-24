import { Router } from "express";
import leadController from "./controller/leadController";
import interactionController from "./controller/interactionController";
import contactController from "./controller/contactController";

const router = Router();

// Lead Routes
router.post("/leads", leadController.createLead);
router.get("/leads", leadController.getLeads);
router.get("/leads/:id", leadController.getLead);
router.put("/leads/:id", leadController.updateLead);
router.delete("/leads/:id", leadController.deleteLead);

// Contact Routes
router.post("/contacts", contactController.createContact);
router.get("/contacts/:leadId", contactController.getContacts);

// Interaction Routes
router.post("/interactions", interactionController.createInteraction);
router.get("/interactions/:leadId", interactionController.getInteractions);

export default router;
