import React from "react";
import {Link} from 'react-router-dom';
import s from './LandingPage.module.css';



export default function LandingPage(){

    return(

        <div className={s.back}>
            <h1 className={s.title}>Welcome To My Best Friend</h1>
            <Link to={'/home'}>
                <button className={s.button}>Start</button>
            </Link>
        </div>
    )
}