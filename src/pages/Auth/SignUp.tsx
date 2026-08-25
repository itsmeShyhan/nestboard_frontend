import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, type FormEvent } from "react"
import { NavLink, useNavigate } from "react-router"

export function SignUp() {
  const {register} = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: FormEvent){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      await register(email, password, displayName)
      navigate("/dashboard")
    } catch {
      setError("Invalid email or password")
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Sign Up</h1>

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

           <Input 
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Have account? <NavLink to={"/sign-in"}>Sign In</NavLink>
          </p>
          
        </div>
      </form>
    </div>
  )
}
