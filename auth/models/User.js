const mongoose = require("mongoose");
const { hashPassword } = require("../utils/passwordUtils");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: [true, "L'adresse email est obligatoire"],
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "L'adresse email n'est pas valide"],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!_@#$%^&*(),.?":{}|<>])[A-Za-z\d!_@#$%^&*(),.?":{}|<>]{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial",
      ],
    },
    phone: { type: String },
    role: {
      type: String,
      enum: ["admin", "manager", "employee", "freelance"],
      default: "freelance",
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // Référence à une entreprise
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }], // Référence aux entreprises
    nextHoliday: { type: Date },
    profilePicture: { type: String }, // URL de la photo de profil
    isActive: { type: Boolean, default: true },
    dateOfBirth: { type: Date },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(uniqueValidator, {
  message: "L'email est déjà utilisé. Veuillez en choisir un autre.",
});

userSchema.pre("save", async function (next) {
  try {
    if (
      !this.isModified("password") ||
      !this.password ||
      this.password.startsWith("$2b$")
    ) {
      return next();
    }
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;

    next();
  } catch (err) {
    next(err);
  }
});

// Middleware pour valider et hasher le mot de passe lors de "findOneAndUpdate"
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    // Validation explicite
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!_@#$%^&*(),.?":{}|<>])[A-Za-z\d!_@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(update.password)) {
      return next(
        new Error(
          "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial"
        )
      );
    }

    // Hachage du mot de passe
    update.password = await hashPassword(update.password);
  }

  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
