import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from 'process';

type CryptoApiHeaders = { [key: string]: string };

interface CryptoApiRequest { url: string, headers: CryptoApiHeaders }

const cryptoApiHeaders: CryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
     // 'x-rapidapi-key': env.RAPID_API_SECRET
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string): CryptoApiRequest => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}`)
        })
    })
})

export const {
    // this hook is made available by default from react toolKit
    // it should match the name from "getCryptos: builder.query" in the createApi call and append a prefix 'use'  and a suffix 'Query'
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;