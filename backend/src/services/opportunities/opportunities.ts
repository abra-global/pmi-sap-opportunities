// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { OpportunitiesService, getOptions } from './opportunities.class'


export * from './opportunities.class'
export const opportunitiesPath = 'opportunities'

export const opportunitiesMethods: Array<keyof OpportunitiesService> = [
  
  'create', 'find', 'get'

]

// A configure function that registers the service and its hooks via `app.configure`
export const opportunities = (app: Application) => {
  // Register our service on the Feathers application
  app.use(opportunitiesPath, new OpportunitiesService(app), {
    // A list of all methods this service exposes externally
    methods: opportunitiesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(opportunitiesPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],     
      create: [],
      get: []
      
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [opportunitiesPath]: OpportunitiesService
  }
}
