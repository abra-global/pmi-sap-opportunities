// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { TerritoriesService, getOptions } from './territories.class'

export const territoriesPath = 'territories'
export const territoriesMethods: Array<keyof TerritoriesService> = [
  'find',
  
]

export * from './territories.class'

// A configure function that registers the service and its hooks via `app.configure`
export const territories = (app: Application) => {
  // Register our service on the Feathers application
  app.use(territoriesPath, new TerritoriesService(app), {
    // A list of all methods this service exposes externally
    methods: territoriesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(territoriesPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
      
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
    [territoriesPath]: TerritoriesService
  }
}
