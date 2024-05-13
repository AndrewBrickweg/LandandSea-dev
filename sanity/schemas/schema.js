import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import staff from "./staff";
import testimonials from "./testimonials";
import photos from "./photos";

export default createSchema({
  name: "default",

  types: schemaTypes.concat([staff, testimonials, photos]),
});
