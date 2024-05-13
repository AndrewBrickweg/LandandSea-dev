import axios from "axios";
import useSWR from "swr";
import {
  byCityURL,
  byId,
  byIdWithProxy,
  byLocationWithPaginationURL,
  comingSoonURL,
  condosURL,
  featuredAgentURL,
  featuredBrokerageURL,
  getOpenHouse,
  headers,
  newestURL,
  singleFamilyURL,
  walkScoreUrl,
  waterfrontURL,
} from "./api";

const getOpenHouseData = async (listingId) => {
  try {
    const res = await axios.get(getOpenHouse(listingId), {
      headers,
    });

    const data = await res?.data?.D?.Results;

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getWalkScore = async (address, lat, lon) => {
  try {
    const res = await axios.get(walkScoreUrl(address, lat, lon));

    const data = await res?.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getFeatured = async () => {
  try {
    const featuredAgentRes = await axios.get(featuredAgentURL, {
      headers,
    });
    const featuredBrokerageRes = await axios.get(featuredBrokerageURL, {
      headers,
    });

    const featuredAgentListings = featuredAgentRes?.data?.D?.Results;
    const featuredBrokerageListings = featuredBrokerageRes?.data?.D?.Results;

    const featuredListings = [
      ...featuredAgentListings,
      ...featuredBrokerageListings,
    ];

    const featuredListingsWithOpenHouseData = await Promise.all(
      featuredListings.map(async (listing) => {
        return {
          ...listing,
          OpenHouseData: await getOpenHouseData(listing.Id),
        };
      })
    );

    return featuredListingsWithOpenHouseData;
  } catch (error) {
    console.error(error);
  }
};

const getSingleFamily = async () => {
  try {
    const res = await axios.get(singleFamilyURL, {
      headers,
    });

    const data = await res?.data?.D?.Results;

    const singleFamilyWithOpenHouseData = await Promise.all(
      data.map(async (listing) => {
        return {
          ...listing,
          OpenHouseData: await getOpenHouseData(listing.Id),
        };
      })
    );

    return singleFamilyWithOpenHouseData;
  } catch (error) {
    console.error(error);
  }
};

const getCondos = async () => {
  try {
    const res = await axios.get(condosURL, {
      headers,
    });

    const data = await res?.data?.D?.Results;

    const condosWithOpenHouseData = await Promise.all(
      data.map(async (listing) => {
        return {
          ...listing,
          OpenHouseData: await getOpenHouseData(listing.Id),
        };
      })
    );

    return condosWithOpenHouseData;
  } catch (error) {
    console.error(error);
  }
};

const getWaterfront = async () => {
  try {
    const res = await axios.get(waterfrontURL, {
      headers,
    });

    const data = await res?.data?.D?.Results;

    const waterfrontWithOpenHouseData = await Promise.all(
      data.map(async (listing) => {
        return {
          ...listing,
          OpenHouseData: await getOpenHouseData(listing.Id),
        };
      })
    );

    return waterfrontWithOpenHouseData;
  } catch (error) {
    console.error(error);
  }
};

const getNewest = async () => {
  try {
    const res = await axios.get(newestURL, {
      headers,
    });

    const data = await res?.data?.D?.Results;

    const newestWithOpenHouseData = await Promise.all(
      data.map(async (listing) => {
        return {
          ...listing,
          OpenHouseData: await getOpenHouseData(listing.Id),
        };
      })
    );

    return newestWithOpenHouseData;
  } catch (error) {
    console.error(error);
  }
};

const getComingSoon = async () => {
  try {
    const res = await axios.get(comingSoonURL, {
      headers,
    });

    const data = await res?.data?.D?.Results;

    const comingSoonWithOpenHouseData = await Promise.all(
      data.map(async (listing) => {
        return {
          ...listing,
          OpenHouseData: await getOpenHouseData(listing.Id),
        };
      })
    );

    return comingSoonWithOpenHouseData;
  } catch (error) {
    console.error(error);
  }
};

const getListingsByCity = async (city) => {
  try {
    const res = await axios.get(byCityURL(city), {
      headers,
    });

    const { Results, Pagination } = await res?.data?.D;

    return { Results, Pagination };
  } catch (error) {
    console.error(error);
  }
};

const getListingsById = async (id) => {
  try {
    const res = await axios.get(byId(id), {
      headers,
    });

    const data = await res?.data?.D.Results[0]?.StandardFields;

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useListing = (id) => {
  const fetcher = () =>
    axios
      .get(byIdWithProxy(id), {
        headers,
      })
      .then((res) => res.data);

  const { data, error } = useSWR(`/api/listing/${id}`, fetcher);

  return {
    data: data?.D?.Results[0]?.StandardFields,
    isLoading: !error && !data,
    isError: error,
  };
};

const useSearchByLocation = (city, page) => {
  const fetcher = () =>
    axios
      .get(byLocationWithPaginationURL(city, page), {
        headers,
      })
      .then((res) => res.data);

  const { data, error } = useSWR(`/api/search/${city}/${page}`, fetcher);

  return {
    data: { Results: data?.D?.Results, Pagination: data?.D?.Pagination },
    isLoading: !error && !data,
    isError: error,
  };
};

export {
  getFeatured,
  getSingleFamily,
  getCondos,
  getWaterfront,
  getNewest,
  getComingSoon,
  getListingsByCity,
  getListingsById,
  getOpenHouseData,
  useListing,
  useSearchByLocation,
  getWalkScore,
};
