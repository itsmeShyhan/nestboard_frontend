import { type ReactNode, useEffect } from "react"
import { useAuth } from "./AuthProvider"

const ADMIN_CLASS = "admin-theme"



export function AdminThemeApplier({ children }: {children: ReactNode}) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return

    const role = (user as { role?: string } | undefined)?.role
    const root = document.documentElement

    if (role === "ADMIN") {
      root.classList.add(ADMIN_CLASS)
    } else {
      root.classList.remove(ADMIN_CLASS)
    }

    return () => {
      root.classList.remove(ADMIN_CLASS)
    }
  }, [user, isLoading])

  return <>{children}</>
}
