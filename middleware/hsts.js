// Request HSTS with preloading and a max-age of 1 year in production
export default ({res}) => {
  if (process.env.NODE_ENV === 'production') {
    res.setHeader(
      'Strict-Transport-Policy',
      'mag-age=31557600; includeSubDomains; preload'
    )
  }
}
