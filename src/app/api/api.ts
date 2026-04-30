// /api/proxy/route.ts

"use client";

import axios from 'axios';


const API = axios.create({
    baseURL: '/api/proxy?path=',
    // baseURL: '/api/proxy',
    withCredentials: true,
    
});

export default API;