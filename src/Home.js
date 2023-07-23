import { Helmet } from 'react-helmet'
import './App.css'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReRadarChart from "./RadarConfig";

function Home (){
   return (
     <Fragment>
       <Helmet><title>Soal Latihan</title></Helmet>
       <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='newline'>
              <div className='flexlogo' id="myChart">HEADER HOME</div>
              <ReRadarChart />
              <ul className='flexmenu'>
                <li className='li-ne'><Link to="/play/intructor" className='test_link'>Mulai Test Soal</Link></li>
                <li className='li-ne'><Link to="/list/data" className='test_link'>List Data Hasil Siswa</Link></li>
              </ul>
            </div>
            </div>
        </div>
      </div>
     </Fragment>
   )
 }

export default Home