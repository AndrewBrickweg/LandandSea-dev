export default {
  title: "Staff",
  name: "staff",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Showcase",
      name: "showcase",
      type: "boolean",
      initialValue: false,
      description: "showcase as owner?",
    },
    {
      title: "Headshot",
      name: "headshot",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: { metadata: ["lqip"] },
    },
    {
      title: "Bio",
      name: "bio",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },

    {
      title: "Phone number",
      name: "phoneNumber",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Email",
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
};
