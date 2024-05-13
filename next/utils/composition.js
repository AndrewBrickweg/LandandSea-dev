const composition = (data) => {
  const Id = data.Id;
  const OpenHouseData = data?.OpenHouseData;
  const {
    BedsTotal,
    BathroomsTotalNotational,
    CurrentPrice,
    LivingArea,
    UnparsedAddress,
    Photos,
    PhotosCount,
    PublicRemarks,
    OnMarketDate,
    MajorChangeType,
    MlsStatus,
  } = data.StandardFields;

  return {
    BedsTotal,
    BathroomsTotalNotational,
    CurrentPrice,
    LivingArea,
    Photos,
    PhotosCount,
    UnparsedAddress,
    Id,
    PublicRemarks,
    OnMarketDate,
    MajorChangeType,
    MlsStatus,
    OpenHouseData,
  };
};

export default composition;
