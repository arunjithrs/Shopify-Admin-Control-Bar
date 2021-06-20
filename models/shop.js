const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const ShopSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
    unique: true,
  },
  sessionId: {
    type: String,
    required: false,
  },
  chargeId: {
    type: String,
    required: false,
  },
  domain: {
    type: String,
    required: false,
  },
  accessToken: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  scope: {
    type: String,
    required: false,
  },
  isOnline: {
    type: Boolean,
  },
  onlineAccessInfo: {},
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  uninstalled: {
    type: Boolean,
    default: false,
  },
  confirmationUrl: {
    type: String,
    default: false,
  },
  banner: BannerSchema,
  apiSettings: {},
});

module.exports = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
