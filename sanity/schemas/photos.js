export default {
  name: "photos",
  type: "document",
  title: "Photos",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Hero Photo?",
      name: "isHero",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: false,
    },
    {
      title: "Page",
      name: "page",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "radio",
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Listings", value: "listings" },
          { title: "Sell", value: "sell" },
        ],
      },
    },
    {
      title: "Picture",
      name: "picture",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: { metadata: ["lqip"] },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
