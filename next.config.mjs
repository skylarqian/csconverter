const isProd = process.env.NODE_ENV === 'production';

export default {
  output: 'export',
  basePath: isProd ? '/csconverter' : '',
  assetPrefix: isProd ? '/csconverter/' : '',
  images: {
    unoptimized: true,
  },
};