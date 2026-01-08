import { territories } from './territories/territories'
import { opportunities } from './opportunities/opportunities'
// import { sapProductGroup } from './sap-product-group/sap-product-group'
import { sapCategories } from './sap-categories/sap-categories'

import { sapStatus } from './sap-status/sap-status'
// import { sapSalesPhase } from './sap-sales-phase/sap-sales-phase'
import { sapSalesCycles } from './sap-sales-cycles/sap-sales-cycles'
import { sapAccounts } from './sap-accounts/sap-accounts'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(territories)
  app.configure(opportunities)
  // app.configure(sapProductGroup)
  app.configure(sapCategories)
  app.configure(sapStatus)
  // app.configure(sapSalesPhase)
  app.configure(sapSalesCycles)
  app.configure(sapAccounts)
  // All services will be registered here
}
