const PropertyDetailsSchema = () => {
  return {
    title: "",
    phone: 0,
    city: "",
    price: 0,
    street: "",
    owner: "",
    ownerName:"",
    info: "",
    flexiblePrice:false,
    ResidencyType: "",
    MapPosition: [],
    imgsUrl: [],
    facilities: {
      size: 0,
      parking: 0,
      bedRoom: 0,
      bathRoom: 0,
    },
  };
};

export default PropertyDetailsSchema;
