import mongoose from "mongoose";
const ResidencySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    street: {
      type: String,
      default: "",
    },
    imgsUrl: {
      type: Array,
      default: [],
    },
    owner: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    flexiblePrice: {
      type: Boolean,
      default: false,
    },
    favArray: {
      type: Array,
      default: [],
    },
    info: {
      type: String,
      default: "",
    },
    ResidencyType: {
      type: String,
      required: true,
    },
    MapPosition: {
      type: Array,
      default: [31.5200263, 35.3026599, 9.25],
    },
    facilities: {
      bathRoom: {
        type: Number,
        default: 0,
      },
      bedRoom: {
        type: Number,
        default: 0,
      },
      parking: {
        type: Number,
        default: 0,
      },
      size: {
        type: Number,
        default: 0,
      },
    },
  },

  { timestamps: { createdAt: "created_at" } }
);

const ResidencyModel = mongoose.model("HouseAPPResidency", ResidencySchema);
export default ResidencyModel;
