import { numberWithCommas } from "../../utils/helpers";

const composition = (data) => {
  const {
    ArchitecturalStyle,
    AssociationFee,
    AssociationFeeFrequency,
    AssociationFeeIncludes,
    AssociationYN,
    CommunityFeatures,
    ConstructionMaterials,
    ElementarySchool,
    ExteriorFeatures,
    FireplaceYN,
    Flooring,
    GarageSpaces,
    HighSchool,
    InteriorFeatures,
    KitchenAppliances,
    Latitude,
    ListingTerms,
    Longitude,
    LotFeatures,
    LotSizeAcres,
    MajorChangeType,
    MiddleOrJuniorSchool,
    NewConstructionYN,
    PoolFeatures,
    PoolYN,
    Roof,
    SeniorCommunityYN,
    SpaYN,
    TaxAmount,
    Utilities,
    WaterFrontYN,
    WaterfrontFeatures,
    YearBuilt,
    UnparsedAdress,
  } = data;

  const formatItems = (features) => {
    const items = Object.keys(features || {}).length;

    if (items < 1) return;

    return Object.keys(features || {}).map((key, i) => {
      if (i + 1 < items) {
        return `${key}, `;
      }
      return key;
    });
  };

  const generalFeatures = {
    tableHeading: "General Features",
    rows: [
      {
        heading: "Style",
        value: formatItems(ArchitecturalStyle),
      },
      {
        heading: "Construction",
        value: formatItems(ConstructionMaterials),
      },
      {
        heading: "Garage Spaces",
        value: GarageSpaces,
      },
      {
        heading: "Listing Terms",
        value: formatItems(ListingTerms),
      },
      {
        heading: "New Construction?",
        value: NewConstructionYN ? "Yes" : "No",
      },
      {
        heading: "Year Built",
        value: YearBuilt,
      },
    ],
  };

  const interiorFeatures = {
    tableHeading: "Interior Features",
    rows: [
      {
        heading: "Overall",
        value: formatItems(InteriorFeatures),
      },
      {
        heading: "Kitchen Appliances",
        value: formatItems(KitchenAppliances),
      },
      {
        heading: "Flooring",
        value: formatItems(Flooring),
      },
      {
        heading: "Fireplace",
        value: FireplaceYN ? "Yes" : "No",
      },
    ],
  };

  const exteriorFeatures = {
    tableHeading: "Exterior Features",
    rows: [
      {
        heading: "General",
        value: formatItems(ExteriorFeatures),
      },
      {
        heading: "Pool?",
        value: typeof PoolYN === "boolean" && PoolYN ? "Yes" : "No",
      },
      {
        heading: "Water Front?",
        value: WaterFrontYN ? "Yes" : "No",
      },
      {
        heading: "Lot Type",
        value: formatItems(LotFeatures),
      },
      {
        heading: "Lot Size",
        value: `${LotSizeAcres} Acres`,
      },
      {
        heading: "Roof",
        value: formatItems(Roof),
      },
    ],
  };

  const communityFeatures = {
    tableHeading: "Community Features",
    rows: [
      {
        heading: "HOA?",
        value: AssociationYN ? "Yes" : "No",
      },
      {
        heading: "Association Fee Frequency",
        value: AssociationFeeFrequency,
      },
      {
        heading: "Association Fee",
        value: AssociationFee ? `$${numberWithCommas(AssociationFee)}` : "",
      },
      {
        heading: "Association Fee Includes",
        value: formatItems(AssociationFeeIncludes),
      },
      {
        heading: "Community Features",
        value: formatItems(CommunityFeatures),
      },
    ],
  };

  const schoolFeatures = {
    tableHeading: "Schools",
    rows: [
      {
        heading: "Elementary School",
        value: ElementarySchool,
      },
      {
        heading: "Middle / Jr High School",
        value: MiddleOrJuniorSchool,
      },
      {
        heading: "High School",
        value: HighSchool,
      },
    ],
  };

  return {
    generalFeatures,
    interiorFeatures,
    exteriorFeatures,
    communityFeatures,
    schoolFeatures,
  };
};

export default composition;
