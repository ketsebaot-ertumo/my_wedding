// /api/proxy/route.ts

"use client";

import axios from 'axios';

const API = axios.create({
    baseURL: '/api/proxy?path=',
    withCredentials: true,
});

export default API;