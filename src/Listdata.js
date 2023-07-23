import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListData = () => {
    const [data, setData] = useState([])
    const [dataFalse, setDataFalse] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            dataAll()
            console.log("re")
            console.log(data)
        },1000)
    },[dataFalse])

    const dataAll = async () =>{
        try{
            const res = await axios.get('http://127.0.0.1:8000/api/getSiswaHasil')
            console.log(res)
            const { status, message, data } = res.data
            if(status == 500){
                alert(message)
                return
            }

            setData(JSON.parse(data))
            setDataFalse(false)

        }catch(e){
            alert(e)
        }
    }

    var i = 1;
    return(<>
     <div className="container" style={{backgroundColor:"red"}}>
                    <div className="row">
                        <div className="col-md-12" style={{textAlign:"center", marginTop:"50px", fontSize:"30px", fontWeight:"bold", color:"white"}}>
                            List Data Siswa
                        </div>
                        <div className="col-md-12" style={{ alignContent:"center", marginTop:"10px"}}>
        
                            <div class="card" style={{width:"85rem", margin:"auto"}}>
                                <div class="card-body">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Hasil</th>
                                        <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((e) => {
                                            
                                         return <>
                                            <tr>
                                            <th scope="row">{i++}</th>
                                            <td>{e.nama}</td>
                                            <td>{e.nilai}</td>
                                            <td>{e.status}</td>
                                            </tr></>   
                                        } )}
                                        
                                    </tbody>
                                    </table>
                                    <button className="btn btn-danger" style={{marginTop:"5px"}}><Link to="/" style={{textDecoration:"none", color:"white"}}>Back</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></>
    )
}

export default ListData