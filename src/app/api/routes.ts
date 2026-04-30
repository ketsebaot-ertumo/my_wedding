// /api/routes.ts

import API from "./api";

const NEXT_PUBLIC_API_URL= process.env.NEXT_PUBLIC_API_URL

// register
export const registerUser = async (credentials: {firstName: string; lastName: string; email: string; password_hash: string; phoneNumber: string;}) => {
  try{
    const data = await API.post(`auth/signup`, credentials);
    return data;
  }catch(err: any){
    // console.error(err);
    return  err?.response.data || err.message
  }
};

// login
export const loginUser = async (credentials: { email: string; password_hash: string }) => {
    try{
      const data = await API.post(`auth/login`, credentials);
      console.log("route data:", data);
      return data;
    }catch(err: any){
      // console.error(err);
      return  err?.response.data || err.message
    }
};

// === GET ALL ===
export const getAllEntities = async (
  entity: string,
  options?: { page?: number; limit?: number; type?: string; search?: string; }
) => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const type = options?.type ?? '';
  const search = options?.search ?? '';

  const { data } = await API.get(`/${entity}?limit=${limit}&page=${page}&type=${type}&search=${search}`);
  // const { data } = await API.get(`${entity}`, {
  //   params: {
  //     limit,
  //     page,
  //     type,
  //     search
  //   }
  // });

  console.log("data:",data)
  return data;
};


// === GET LATEST ===
export async function getLatestEntity(entity: string ) {
  try {
      const res = await API.get(`${entity}/latest`);
      return res?.data || res;
  } catch (err: any) {
      // console.error(`Error fetching latest ${entity}:`, err);
      return err.message;
  }
}


// Generic function to get a single entity by ID
export const getEntity = async (entity: string, id: string) => {
  try{
    const data = await API.get(`${entity}/${id}`);
    return data;
  }catch(err: any){
    // console.error(err);
    return err.message
  }
};

// Generic function to get search result of a type
export const getSearchResults = async (keyword: string) => {
  try{
    const data = await API.get(`search/?keyword=${keyword}`);
    return data;
  } catch(err: any){
    // console.error(err);
    return err.message
  }
};


// Generic function to create a new entity
export const createEntity = async (entity: string, values: any) => {
  try{
    const data = await API.post(`${entity}`, values);
    return data;
  }catch(err: any){
    // console.error("\nerror in createEntity", err.message, "\nerr:",err?.response?.data?.error?.detail, );
    return err?.response?.data?.error || err.message || "Unknown error";
  }
};

// Generic function to update an existing entity
export const updateEntity = async (entity: string, values?: any) => {
  try{
    const data = await API.put(`${entity}`, values); 
    return data;
  }catch(err: any){
    // console.error(err);
    return err?.response?.data?.error || err.message || "Unknown error";
  }
};

// Generic function to delete an entity
export const deleteEntity = async (entity: string, id: string) => {
  try{
    const data = await API.delete(`${entity}/${id}`);
    return data;
  }catch(err: any){
    // console.error(err);
    return err?.response?.data?.error || err.message || "Unknown error";
  }
};
