import { redis } from "./redis";

const get = async (key) => {
  const value = await redis.get(key);
  if (!value) return null;

  return JSON.parse(value);
};

const set = async (key, fetcher, expires) => {
  console.log("cache miss");
  const value = await fetcher();

  await redis.set(key, JSON.stringify(value), "EX", expires);
  return value;
};

const del = async (key) => await redis.del(key);

const fetch = async (key, fetcher, expires) => {
  const ttl = expires * 60;
  const existing = await get(key);
  if (existing !== null) {
    console.log("cache hit");

    return existing;
  }

  return set(key, fetcher, ttl);
};

export default { fetch, set };
