// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, Params } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import axios from 'axios'



export interface SapSalesCyclesServiceOptions {
  app: Application
}



// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SapSalesCyclesService {
  constructor(app: Application) { }

  async find(_params?: Params): Promise<any[]> {
    const baseUerl = process.env.BASE_URL_SAP
    const salesCycle = process.env.URL_SALES_CYCLES
    try {
      const results = await axios.get(`${baseUerl}/${salesCycle}`,
        {
          auth: {
            username: process.env.SAP_USER || '',
            password: process.env.SAP_PASSWORD || ''
          }
        }
      )
      console.log("res:", results.data)
      console.log("len:", results.data.value.length)

      return results.data.value

    }
    catch (error: any) {
      console.error("Full error:", error.response?.data || error.message)
      throw new Error(`Failed to fetch Sales Cycles: ${error.message}`)
    }

  }

}

export const getOptions = (app: Application) => {
  return { app }
}
