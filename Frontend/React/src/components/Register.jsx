import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Register.css'
const Register = () => {
  const inivalues = { name: "", email: "", password: "" }
  const [formvalues, setFormvalues] = useState(inivalues)
  const [message, setMessage] = useState("")
  const navigate=useNavigate()
  const inputChange = (event) => {
    setFormvalues({ ...formvalues, [event.target.name]: event.target.value })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log("Sending:", formvalues)

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formvalues),
      })

      if (response.ok) 
      {
        setMessage("Registration Successful")
        navigate('/Login')
      } else {
        setMessage("Invalid Details")
      }
    } catch (error) {
      setMessage("Error Connecting to Server")
      console.error(error)
    }
  }

  return (
    <div className="container">
      <h4 className="h-4">Enter Registration Details</h4>

      <form onSubmit={submitHandler}>
        <label>Enter Username</label>
        <input type="text" name="name" value={formvalues.name} onChange={inputChange} />

        <br /><br />

        <label>Enter Email</label>
        <input type="email" name="email" value={formvalues.email} onChange={inputChange} />

        <br /><br />

        <label>Enter Password</label>
        <input type="password" name="password" value={formvalues.password} onChange={inputChange} />

        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  )
}

export default Register
