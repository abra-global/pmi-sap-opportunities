// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import axios from 'axios';



export interface OpportunitiesServiceOptions {
  app: Application
}
interface Accounts {
  id: string
  name: string
}

interface CreateOpportunityData {
  oppName: string;
  accounts: Accounts[];
  // ownerId: string;
  salesCycleCode: string;
  salesPhaseCode: string;
  lifeCycleStatus: string;
  processingTypeCode: string;
  seriesCode?: string;
}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class OpportunitiesService {
  constructor(app: Application) { }


  async find(params?: Params) {
    const baseUrl = process.env.BASE_URL_SAP;
    const opportunityUrl = process.env.URL_OPPORTUNITY;

    try {
      const response = await axios.get(
        `${baseUrl}/${opportunityUrl}`,
        {
          auth: {
            username: process.env.SAP_USER || '',
            password: process.env.SAP_PASSWORD || ''
          }
        }
      );

      // console.log('📥 Opportunities from SAP:', response.data);
      return response.data;

    } catch (error: any) {
      console.error('❌ Error:', error.response?.data || error.message);
      throw error;
    }
  }
  async get(id: Id, params?: Params): Promise<any> {
    const baseUrl = process.env.BASE_URL_SAP
    const seriesUrl = process.env.URL_OPPORTUNITY_SERIES
    console.log("baseUrl:", baseUrl)
    console.log("seriesUrl: ", seriesUrl)
    try {
      if (id === 'series') {

        const res = await axios.get(`${baseUrl}/${seriesUrl}`, {
          auth: {
            username: process.env.SAP_USER || '',
            password: process.env.SAP_PASSWORD || ''
          }

        })
        console.log("serriess:", res.data.value)
        return res.data.value.content
      }


    } catch (error: any) {
      console.error('❌ Error:', error.response?.data || error.message);
      throw error;

    }
  }
  async create(data: CreateOpportunityData, params?: Params): Promise<any> {



    const baseUrl = process.env.BASE_URL_SAP
    const opportunityUrl = process.env.URL_OPPORTUNITY
    const { oppName, accounts, salesCycleCode, salesPhaseCode, lifeCycleStatus, processingTypeCode, seriesCode } = data;
    const results = [];

    for (const account of accounts) {
      const accountName = account.name.substring(0, account.name.lastIndexOf(' '))
      console.log("accountName", accountName)
      const fullOpportunityName = `${accountName}-${oppName}`
      try {
        const reqBody: any = { 
          name: fullOpportunityName,
          account: {
            id: account.id
          },
          salesCycle: salesCycleCode,
          salesPhase: salesPhaseCode,
          customStatus: lifeCycleStatus,
          category: processingTypeCode,
          currencyCode: "USD"
        }; 

        if (seriesCode) {
          reqBody.extensions = {
            zSerieses: seriesCode
          };
        }
        const response = await axios.post(
          `${baseUrl}/${opportunityUrl}`,
          reqBody,
          {
            auth: {
              username: process.env.SAP_USER || '',
              password: process.env.SAP_PASSWORD || ''
            }
          }
        );

        results.push({
          account,
          success: true,
          opportunity: response.data
        });

      } catch (error: any) {
        results.push({
          accounts,
          success: false,
          error: error.response?.data || error.message
        });
      }
    }

    return {
      total: accounts.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      reasonFailed: results.filter(r => !r.success).map(r => r.error),
      results
    };
  }



}

export const getOptions = (app: Application) => {
  return { app }
}
