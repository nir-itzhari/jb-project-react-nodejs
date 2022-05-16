import "./AnimatedPage.css";
import { motion } from "framer-motion"

function AnimatedPage({ children }: any): JSX.Element {

    const animation = {
        initial: { 
            opacity: 0, 
            x: 100 },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.1 }
        },
        exit: {
            opacity: 0,
            x: -100,
            // transition: { duration: 0.1 }
        }
    }

    return (
        <motion.div
            className="animated-div"
            variants={animation}
            initial="initial"
            animate="animate"
            exit="exit"
        >

            {children}
        </motion.div>
    );
}

export default AnimatedPage;
