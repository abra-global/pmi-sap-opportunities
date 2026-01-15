import { useMsal } from "@azure/msal-react";

export const LogOut = () => {
    
    const {instance} = useMsal();
    console.log("instance:", instance)

    const handelLogOut = async () => {
        try {
            await instance.logoutPopup()
            console.log("Logout successful")
        }
        catch(error){
            console.error("Logout Failed:", error)
        }
    }
    return(
        <button onClick={handelLogOut}>Logout</button>
    )
}