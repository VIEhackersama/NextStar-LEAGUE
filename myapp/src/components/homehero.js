// import { motion } from 'framer-motion'

export default function Abouthero() {
    return (
        <div>
            <div className="position-relative vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundImage: `url(https://media.discordapp.net/attachments/1399744388967563288/1413501305900630027/Full-table.png?ex=68cf46ec&is=68cdf56c&hm=2c643bea540137dab486cc431b69c27c05c8b79cad4b535cf6f1dac47ff6b529&=&format=webp&quality=lossless&width=1604&height=902)`,
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
                    <img style={{ filter: "" }} className="p-3 img-fluid" src='http://localhost:3000/image/logo.png'></img>
                    <p className="container text-white fs-3">
                        <div className="dm-serif-text-regular text-white fs-1">NEXTSTAR LEAGUE</div>
                        Not just about a ball and 22 players. It's about continuing the lagacy of a lengendary.<br></br>
                        NextStar League, becoming the next star!
                    </p>
                    <a href='/contact' className="btn btn-danger my-4 px-5 btn-lg" style={{ borderRadius: '30px' }}>
                        <span style={{ color: "" }}>Learn more!</span>
                    </a>
                </div>
            </div>
        </div>
    );
}