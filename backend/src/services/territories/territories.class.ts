// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services


import { Params } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import axios from 'axios'





// This is a skeleton for a custom service class. Remove or add the methods you need here
export class TerritoriesService{

  constructor(app: Application){}
  async find(_params?: Params): Promise<any[]> {
    const baseUrl = process.env.BASE_URL_SAP || ''
    const territories = process.env.URL_TERRITORIES || ''

    try{
      const results = await axios.get(`${baseUrl}/${territories}`, {
        auth: {
          username: process.env.SAP_USER || '',
          password: process.env.SAP_PASSWORD || ''
        } 

      })
      console.log("Territories:", results.data)
      return results.data.value

    }catch(error: any){
      console.error("Full error:", error.response?.data || error.message)
      throw new Error(`Failed to fetch territories: ${error.message}`)

    }
   

  }


 
}

export const getOptions = (app: Application) => {
  return { app }
}
