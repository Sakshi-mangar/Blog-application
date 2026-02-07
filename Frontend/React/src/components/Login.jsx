import { useState } from "react"
import './login.css'
const Login = () => {
    const initialvalues = { name: " ", email: " ", password: " " }
    const [formvalues, setFormvalues] = useState(initialvalues)
    const [message,setMessage]=useState(" ")
    const inputChange = (event) => {
        setFormvalues({ ...formvalues, [event.target.name]: event.target.value })
    }
    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            console.log(formvalues)
            const response = await fetch('http://localhost:3000/login',{
              method:'POST',
              headers:{
                'Content-Type':"application/json"
              },
              body:JSON.stringify(formvalues)
            })
            const data=await response.json()
            if(response.ok)
            {
                setMessage(data.message)
                localStorage.setItem("token", data.token);
                const token=localStorage.getItem("token")
                const res=await fetch("http://localhost:3000/profile",
                    {
                    method:"GET",
                    headers:
                    {
                        'Authorization':`Bearer ${token}`
                    }
                })
             const ans=await res.json();
             console.log(ans)
            }
            else
            {
                setMessage("Invalid Message")
            }
        } catch (error) {
             setMessage("Error Connecting To Server",error)
        }
    }
    return (
        <div className="container">
            <form onSubmit={submitHandler}>
                <label htmlFor="md-1">Enter name</label>
                <input type="text" name="name" value={formvalues.name} id="md-1" onChange={inputChange} />
                <br />
                <br />
                <label htmlFor="md-2">Enter Email</label>
                <input type="email" name="email" value={formvalues.email} id="md-2" onChange={inputChange} />
                <br />
                <br />
                <label htmlFor="md-3">Enter Password</label>
                <input type="password" name="password" value={formvalues.password} id="md-3" onChange={inputChange} />
                <br/>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    )
}
export default Login