import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Contact = () => {
    const [siswa, setSiswa] = useState()
    const [LoggedIn, setLoggedIn] = useState(false)
    let navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault();
        const post = {siswa : siswa}
        try{
                const res = await axios.post('http://127.0.0.1:8000/api/insert_user', post)
                const { status, message, data } = res.data
                if(status == 500){
                        alert(message)
                        return
                    }
                setLoggedIn(true)
        }catch(e){
            alert(e)
        }
    }

    useEffect(() => {
        if (LoggedIn){
         navigate("/mulai/latihan", { state: siswa });
        }
     },[LoggedIn]);


    return(
        <>
            <div className="container" style={{backgroundColor:"red"}}>
                <div className="row">
                    <div className="col-md-12" style={{textAlign:"center", marginTop:"50px", fontSize:"30px", fontWeight:"bold"}}>
                        Mulai Quis, Silahkan Isi Nama Terlebih Dahulu
                    </div>
                    <div className="col-md-12" style={{ alignContent:"center", marginTop:"10px"}}>
                        <center>
                        <div class="card" style={{width:"40rem"}}>
                            <div class="card-body">
                            <form onSubmit={onSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Nama Siswa</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" onChange={(event) => {
                                        setSiswa(event.target.value)
                                    }} value={siswa}/>
                                    <small id="emailHelp" class="form-text text-muted" style={{textAlign:"left"}}>We'll never share your name with anyone else.</small>
                                </div> 
                                <button className="btn btn-primary" type="submit">Mulai Mengerjakan</button>
                                    
                                {/* <button className="btn btn-primary" type="submit"><Link to="/mulai/latihan" style={{textDecoration:"none", color:"white"}} >Mulai Mengerjakan</Link></button> */}
                                </form>
                                <button className="btn btn-danger" style={{marginTop:"5px"}}><Link to="/" style={{textDecoration:"none", color:"white", marginRight:"50px", gap:"50px"}}>Back</Link></button>
                            </div>
                        </div>

                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact