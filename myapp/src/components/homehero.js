import { motion } from 'framer-motion'
import '../styles/header.css'
export default function Abouthero() {
    return (
        <div>
            <div className="position-relative vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/image/history2.png)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: "brightness(50%)",
                        zIndex: 1,
                    }}
                ></div>
                <div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="position-relative text-center" style={{ zIndex: 2 }}>
                    <div className='d-flex'>
                        <img style={{ filter: "" }} className="py-3 img-fluid" src='http://localhost:3000/image/logo.png'></img>
                        <div style={{fontSize:"75px"}} className="px-5 dm-serif-text-regular text-white brand">NEXTSTAR LEAGUE</div>
                    </div>
                    <div className="container nav-link text-white fs-3">
                        Not just about a ball and 22 players. It's about continuing the lagacy of a lengendary.<br></br>
                        NextStar League, becoming the next star!
                    </div>
                    <a href='/contact' className="btn btn-danger my-4 px-5 btn-lg" style={{ borderRadius: '30px' }}>
                        <span style={{ color: "" }}>Learn more!</span>
                    </a>
                </div>
            </div>
        </div>
    );
}