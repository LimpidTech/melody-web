import React from 'react'

import Search from 'components/Search'

import { Link } from 'react-router-dom'

export default () => (
  <nav>
    <Link to="/home/">Home</Link>
    <Link to="/categories/">Categories</Link>
    <Link to="/login/">Login</Link>
    <Search />
  </nav>
)
