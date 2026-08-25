import { fetchMe, type AuthUser } from "@/api/auth"
import { clearAccessToken, getAccessToken, setAccessToken } from "@/api/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";
import { login as apiLogin, register as apiRegister } from "@/api/auth";
type AuthContextValue = {
    user: AuthUser | undefined,
    isLoading: boolean,
    isSignedIn: boolean,
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, displayName: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({children}: {children: ReactNode}){
    const queryClient = useQueryClient()
    const [hasToken, setHasToken] = useState(!!getAccessToken())
    const {data: user, isLoading} = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        enabled: hasToken,
        retry: false
    })

    async function login(email: string, password: string){
        const {accessToken} = await apiLogin(email, password)
        setAccessToken(accessToken)
        setHasToken(true)
        await queryClient.setQueryData(["me"], undefined)
    }

    async function logout(){
        clearAccessToken()
        setHasToken(false)
        await queryClient.setQueryData(["me"], undefined)
    }

    async function register(email: string, password: string, displayName: string){
        const {accessToken} = await apiRegister(email, password, displayName)
        setAccessToken(accessToken)
        setHasToken(true)
        await queryClient.setQueryData(["me"], undefined)
    }

    return(
        <AuthContext.Provider value={{
                user,
                isLoading: hasToken && isLoading,
                isSignedIn: !!user,
                login,
                logout,
                register

            }}>
                {children}

        </AuthContext.Provider>
    )


}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(){
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
    return ctx
}