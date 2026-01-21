// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import axios from 'axios'




console.log("🔥 SAP STATUS SERVICE FILE LOADED 🔥")

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SapStatusService {
  constructor( app: Application) {}

  async find(_params?: Params): Promise<any[]> {
    const baseUrl = process.env.BASE_URL_SAP
    const statusUrl = process.env.URL_STATUS
    console.log("status:", statusUrl)
    try {
       const results = await axios.get(`${baseUrl}/${statusUrl}`, 
        { auth: {
          username: process.env.SAP_USER || '',
          password: process.env.SAP_PASSWORD  || ''
        }}
       )
      //  console.log("res:", results.data.value)
       console.log("len:", results.data.value.length)

    return results.data.value

    }catch(error: any){
       console.error("=== ERROR in SapStatus Service ===")
      console.error("Error message:", error.message)
      console.error("Error response status:", error.response?.status)
      console.error("Error response data:", error.response?.data)
      console.error("Full error:", error)
      
     
      throw error
    }
   
  }

}

export const getOptions = (app: Application) => {
  return { app }
}
