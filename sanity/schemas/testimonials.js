export default {
  title: "Testimonials",
  name: "testimonials",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      description: "ex: Jane Doe",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Brief Description",
      name: "desc",
      description: "Home Solid in 2021",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "review",
      type: "array",
      title: "Review",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "block",
        },
      ],
    },

    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
