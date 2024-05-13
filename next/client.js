import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: '4kp26ahs',
  dataset: 'production',
  useCdn: true,
});
