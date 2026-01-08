
import './App.css'
import { LoginButton } from './auth/LoginButton'
import { LogOut } from "./auth/LogOut"
import OpportunityCreation from "./componnents/OpportunityCreationPage"
import { useIsAuthenticated } from '@azure/msal-react'
function App() {
  const isAuthenticated = useIsAuthenticated();


  return (
    <div>
      {!isAuthenticated && < LoginButton />}
      {isAuthenticated &&
        <>
          <LogOut />
          < OpportunityCreation />
        </> }
    </div>
  )
}

export default App
