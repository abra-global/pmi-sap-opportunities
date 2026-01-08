import { useMsal } from "@azure/msal-react"
import { loginRequest } from "./msalConfig";

export const LoginButton = () => {
    const { instance } = useMsal();
    const handleLogin = async () => {
        try {
            await instance.loginPopup(loginRequest)
            console.log("Login successful");

        }
        catch (error) {
            console.error("Login Failed: ", error)

        }

    }

    return (
        <button className="
        appearance-none
        bg-white 
        text-blue-600 
        border 
        border-blue-600 
        font-semibold 
        py-2 
        px-6 
        rounded-lg 
        hover:bg-blue-600 
        hover:text-white 
        transition 
        duration-200
    "
            onClick={handleLogin}>Login with Microsoft</button>

    )
}