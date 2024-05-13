export const GET_IMAGES_BY_PAGE = (
  page
) => `*[_type == 'photos' && page[0] == '${page}'] {
  isHero,
  "img":picture.asset->{url, "lqip": metadata.lqip},
   "alt":picture.alt
}`;

export const GET_TESTIMONIALS = `*[_type == 'testimonials'] {
  _id,
  name,
  desc,
  "review": review[0].children[0].text
}`;

export const GET_STAFF = `*[_type == 'staff'] {
  email,
  name,
  phoneNumber,
  title,
  bio,
  "headshot": headshot.asset->{url, "lqip": metadata.lqip},
  showcase
  }`;
