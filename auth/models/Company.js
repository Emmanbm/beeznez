const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Nom de l'entreprise
    email: {
      type: String,
      required: [true, "L'adresse email est obligatoire"],
      unique: true, // Adresse email unique
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "L'adresse email de l'entreprise n'est pas valide",
      ],
    },
    isTheMainCompany: { type: Boolean, default: false }, // The main company c'est l'entreprise qui se charge de toute la gestion du site, en l'occurence: BeeZnez
    phone: { type: String }, // Numéro de téléphone
    website: { type: String }, // URL du site web
    industry: { type: String }, // Secteur d'activité (par exemple, Technologie, Santé)
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Références aux utilisateurs employés
    logo: { type: String }, // URL du logo de l'entreprise
    invitationCode: { type: String, unique: true }, // Code d'invitation unique
    isActive: { type: Boolean, default: true }, // Statut actif ou non
    registrationNumber: { type: String }, // Numéro d'enregistrement ou SIRET
    taxId: { type: String }, // Numéro fiscal (facultatif)
    bankDetails: {
      bankName: { type: String },
      accountNumber: { type: String },
      iban: { type: String },
    },
    createdAt: { type: Date, default: Date.now }, // Date de création
    updatedAt: { type: Date, default: Date.now }, // Dernière mise à jour
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

companySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
