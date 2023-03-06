import React from 'react';
import axios from 'axios';
import ListProducts from '@/components/products/ListProducts';

import queryString from 'query-string';

const getProducts = async (searchParams) => {

  const urlParams = {
    keyword: searchParams.keyword
  }

  const searchQuery = queryString.stringify(urlParams);

  console.log(searchQuery);

  const { data } = await axios.get(`${process.env.API_URL}/api/products?${searchQuery}`);
  return data;
}

const HomePage = async ({searchParams}) => {
  const productsData = await getProducts(searchParams);
 // console.log(searchParams);
  return <ListProducts data={productsData}/>
}

export default HomePage