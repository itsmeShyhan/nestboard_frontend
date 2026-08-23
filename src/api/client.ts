import { API_URL } from "./config";

const TOKEN_KEY = "nestboard_access_token";

export function getAccessToken(){
    console.log("TOKEN KEY: " + TOKEN_KEY)

    return localStorage.getItem(TOKEN_KEY)

}

export function setAccessToken(token: string){
    console.log("TOKEN KEY: " + TOKEN_KEY)

    return localStorage.setItem(TOKEN_KEY, token)
}

export function clearAccessToken(){
    console.log("TOKEN KEY: " + TOKEN_KEY)

    return localStorage.removeItem(TOKEN_KEY)
}

type ApiOptions = RequestInit & {
    auth?: boolean
}


export async function apiFetch<T>(path: string, options: ApiOptions = {}){
    console.log("inside API Fetch")
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    if (options.auth){
        const token = getAccessToken();
        if (token) headers.set("Authorization", `Bearer ${token}`)

    }
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers
    })

    console.log(`${API_URL}${path}`)

    if (!res.ok) throw new Error(`API request failed: ${res.status}`)
    if (res.status === 204) return undefined as T
    return res.json() as Promise<T>
}