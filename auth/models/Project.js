const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // Référence à l'entreprise
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Références aux users
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Références aux tâches
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

projectSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
