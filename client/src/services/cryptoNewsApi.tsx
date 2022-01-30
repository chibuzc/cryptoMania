import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from 'process';

type CryptoNewsApiHeaders = { [key: string]: string };

interface CryptoNewsApiRequest { url: string, headers: CryptoNewsApiHeaders }

const cryptoNewsApiHeaders: CryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    // 'x-rapidapi-key': env.RAPID_API_SECRET
  }

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url: string): CryptoNewsApiRequest => ({ url, headers: cryptoNewsApiHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})



export const {
    // this hook is made available by default from react toolKit
    // it should match the name from "getCryptos: builder.query" in the createApi call and append a prefix 'use'  and a suffix 'Query'
    useGetCryptoNewsQuery
} = cryptoNewsApi;