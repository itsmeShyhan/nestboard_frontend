import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, type FormEvent } from "react"
import { NavLink, useNavigate } from "react-router"

export function SignIn() {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: FormEvent){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      await login(email, password)
      navigate("/dashboard" )
    } catch {
      setError("Invalid email or password")
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Sign in</h1>

        <div className="flex flex-col gap-3">
          <Input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

           <Input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            No account? <NavLink to={"/sign-up"}>Sign Up</NavLink>
          </p>
          
        </div>
      </form>
    </div>
  )
}
