
// /hooks/use-query.ts
"use client"

import { useCallback, useEffect, useState } from "react";
import { getAllEntities, getEntity } from  "../app/[locale]/api/routes";
import { useToast } from "./use-toast";

export const useQuery = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { success, error } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetcher();
      setData(res);
    } catch (err: any) {
      setErr(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return { data, err, loading, error, success, refetch: fetchData };
  };


  export const useAllEntities = (
    entity: string,
    options?: { page?: number; limit?: number; type?: string; search?: string; }
  ) => {
    try{
      const page = options?.page ?? 1;
      const limit = options?.limit ?? 5;
      const type = options?.type ?? '';
      const search = options?.search ?? '';
    
      const fetchAllEntities = useCallback(
        async () => await getAllEntities(entity, { page, limit, type, search }),
        [entity, page, limit, type, search]
      );
    
      return useQuery(fetchAllEntities);
    } catch (err: any) {
      // console.error(`Error fetching all ${entity}s:`, err);
      return err.message;
    }
  };


// Fetch single entity
export const useSingleEntity = (entity: string, id: string) => {
  try{
    const fetchEntity = useCallback(async () => await getEntity(entity, id), [entity, id]);
    return useQuery(fetchEntity);
  } catch (err: any) {
    // console.error(`Error fetching single ${entity}:`, err);
    return err.message;
  }
};


// // CRUD actions (used inside forms or dialogs)
// export const useEntityActions = (entity: string) => {
//   const { success } = useToast();

//   return {
//     create: async (values: any) => {
//       try{
//         const res = await createEntity(entity, values);
//         return res;
//       } catch (err: any) {
//         // console.error(`Error creating ${entity}:`, err);
//         return err.message;
//       }
//     },

//     // delete
//     update: async (id: string, values: any) => {
//       try{
//         const res = await updateEntity(entity, id, values);
//         return res;
//       } catch (err: any) {
//         // console.error(`Error updating ${entity}:`, err);
//         return err.message;
//       }
//     },

//     // remove
//     remove: async (id: string) => {
//       try{
//         const res = await deleteEntity(entity, id);
//         return res;
//       } catch (err: any) {
//         // console.error(`Error deleting ${entity}:`, err);
//         return err.message;
//       }
//     },
//   };
// };
// export { useToast };

