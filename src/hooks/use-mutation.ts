
// /hooks/use-query.ts
"use client"

import { createEntity, deleteEntity, updateEntity } from "@/app/api/routes"
import { useToast } from "./use-toast";


// CRUD actions (used inside forms or dialogs)
export const useEntityActions = () => {
  const { success } = useToast();

  return {
    create: async (entity: string, values: any) => {
      try{
        const res = await createEntity(entity, values);
        return res;
      } catch (err: any) {
        // console.error(`Error creating ${entity}:`, err);
        // return err.message;
        throw new Error(err.message || 'Unable to create.'); 
      }
    },

    // delete
    update: async (entity: string, values?: any) => {
      try{
        const res = await updateEntity(entity, values);
        return res;
      } catch (err: any) {
        // console.error(`Error updating ${entity}:`, err);
        throw new Error(err.message || 'Unable to update.'); 
      }
    },

    // remove
    remove: async (id: string, entity: string) => {
      try{
        const res = await deleteEntity(entity, id);
        return res;
      } catch (err: any) {
        // console.error(`Error deleting ${entity}:`, err);
        throw new Error(err.message || 'Unable to delete.'); 
      }
    },
  };
};
export { useToast };

