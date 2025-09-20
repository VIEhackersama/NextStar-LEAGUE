// import { motion } from 'framer-motion'

export default function Abouthero() {
    return (
        <div>
            <div className="position-relative vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundImage: `url(https://cdn.prod.website-files.com/661d888187e5cc660a8c375d/664c19d0d3f2cd84ab484028_calligraphy-min.webp)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: "brightness(50%)",
                        zIndex: 1,
                    }}
                ></div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="position-relative text-center" style={{ zIndex: 2 }}>
                    <img style={{ filter: "invert(100%)" }} className="p-3 img-fluid" src='/image/logo1.png'></img>
                    <p className="container text-white">
                        <div className="h3">LEARN CALLIGRAPHY WITHIN YOUR OWN SCREEN</div><br></br>
                        Witness the ancient art of calligraphy defy modern chaos<br></br> We're not just writing; we're resurrecting history, one elegant stroke at a time.
                    </p>
                    <a href='/about' className="btn btn-info my-4 px-5 btn-lg" style={{ borderRadius: '30px' }}>
                        <span style={{ color: "brown" }}>Learn more!</span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}