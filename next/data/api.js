const headers = {
  Authorization: `${process.env.SPARK_TOKEN}`,
  Accept: "application/json",
  "X-SparkApi-User-Agent": "LandandSea",
  "Access-Control-Allow-Origin": "*",
  "Content-Encoding": "gzip, deflate",
};

// Agent MLS ID
const agentId = "20231027165334031417000000";
const companyId = "20231027161837082340000000";

const generalFeatures = "ArchitecturalStyle,ConstructionMaterials,GarageSpaces";
const interiorFeatures =
  "Flooring,InteriorFeatures,KitchenAppliances,FireplaceYN";
const exteriorFeatures =
  "ExteriorFeatures,LotFeatures,PoolYN,PoolFeatures,SpaYN,SpaFeatures,WaterFrontYN,WaterfrontFeatures,LotSizeAcres";
const communityFeatures =
  "AssociationYN,AssociationFeeIncludes,AssociationFeeFrequency,AssociationFee,CommunityFeatures";
const miscFeatures =
  "ListingTerms,NewConstructionYN,Roof,SeniorCommunityYN,TaxAmount,Utilities";

// Custom fields
const detailedFields = `BedsTotal,BathroomsTotalNotational,LivingArea,UnparsedFirstLineAddress,UnparsedAddress,City,StateOrProvince,PostalCode,CurrentPrice,ElementarySchool,MiddleOrJuniorSchool,HighSchool,Latitude,Longitude,MajorChangeType,MlsStatus,OnMarketDate,PropertySubType,PublicRemarks,YearBuilt,Photos.Primary,Photos.UriThumb,Photos.Uri1600,Photos.Uri640,Photos.Uri300,${generalFeatures},${interiorFeatures},${exteriorFeatures},${communityFeatures},${miscFeatures}`;

const briefFields =
  "BedsTotal,BathroomsTotalNotational,CurrentPrice,LivingArea,UnparsedAddress,ListingId,ListAgentMlsId,MlsStatus,OnMarketDate,MajorChangeType,Latitude,Longitude,PublicRemarks,Photos.Uri300";

// Filters

const baseFilters = `_filter=PropertyClass Eq 'Residential' And (MlsStatus Eq 'Active' Or MlsStatus Eq 'Coming Soon' Or MlsStatus Eq 'Pending' Or MlsStatus Eq 'Backups')`;

const filterByAgent = `And ListAgentId Eq '${agentId}'`;

const filterByBrokerage = `And ListCompanyId Eq '${companyId}' And ListAgentId Ne '${agentId}'`;

const filterByWaterfront = "And WaterFrontYN Eq true";

const filterBySingleFamily = "And PropertySubType Eq 'Single Family Detached'";

const filterByCondos = "And PropertySubType Eq 'Condominium'";

const filterByNewest = `And OnMarketDate Ge days(-7)`;

const filterByCity = (city) => {
  const isZipCode = !!Number(city);

  return isZipCode ? `And PostalCode Eq '${city}'` : `And City Eq '${city}'`;
};

const primaryPhoto = "PrimaryPhoto";

const allPhotos = "Photos";

const limit = "12";

// Fetch URLs
const proxy = "https://radiant-scrubland-26234.herokuapp.com/";
const sparkListingsURL = "https://replication.sparkapi.com/v1/listings";

const featuredAgentURL = `${sparkListingsURL}?_select=${briefFields}&${baseFilters} ${filterByAgent}&_expand=${primaryPhoto}&_limit=${limit}`;

const featuredBrokerageURL = `${sparkListingsURL}?_select=${briefFields}&${baseFilters} ${filterByBrokerage}&_expand=${primaryPhoto}&_limit=${limit}`;

const singleFamilyURL = `${sparkListingsURL}?_select=${briefFields}&${baseFilters} ${filterBySingleFamily}&_expand=${primaryPhoto}&_limit=${limit}`;

const condosURL = `${sparkListingsURL}?_select=${briefFields}&${baseFilters} ${filterByCondos}&_expand=${primaryPhoto}&_limit=${limit}`;

const waterfrontURL = `${sparkListingsURL}?_select=${briefFields}&${baseFilters} ${filterByWaterfront}&_expand=${primaryPhoto}&_limit=${limit}`;

const newestURL = `${sparkListingsURL}?_select=${briefFields}&${baseFilters} ${filterByNewest}&_expand=${primaryPhoto}&_limit=${limit}&_orderby=-OnMarketDate`;

const comingSoonURL = `${sparkListingsURL}?_select=${briefFields}&_filter=PropertyClass Eq 'Residential' And MlsStatus Eq 'Coming Soon'&_expand=${primaryPhoto}&_limit=${limit}`;

const byCityURL = (city) =>
  `${sparkListingsURL}?_select=${briefFields}&${baseFilters} ${filterByCity(
    city
  )}&_expand=${primaryPhoto}&_limit=${limit}`;

const byLocationWithPaginationURL = (city, page) =>
  `${proxy}${sparkListingsURL}?_select=${briefFields}&${baseFilters} ${filterByCity(
    city
  )}&_expand=${primaryPhoto}&_limit=${limit}&_pagination=1&_page=${page}`;

const getOpenHouse = (listingId) =>
  `https://replication.sparkapi.com/v1/listings/${listingId}/openhouses`;

const byId = (id) =>
  `${sparkListingsURL}/${id}?_select=${detailedFields}&_expand=${allPhotos}`;

// need to use proxy if client fetched
const byIdWithProxy = (id) =>
  `${proxy}${sparkListingsURL}/${id}?_select=${detailedFields}&_expand=${allPhotos}`;

const walkScoreUrl = (address, lat, lon) =>
  `${proxy}https://api.walkscore.com/score?format=json&address=${address}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=${process.env.WALK_SCORE}`;

export {
  headers,
  featuredAgentURL,
  featuredBrokerageURL,
  singleFamilyURL,
  condosURL,
  waterfrontURL,
  newestURL,
  comingSoonURL,
  walkScoreUrl,
  byCityURL,
  byLocationWithPaginationURL,
  byId,
  byIdWithProxy,
  getOpenHouse,
};
