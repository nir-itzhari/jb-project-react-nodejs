import { motion } from "framer-motion";
import "./FadeInPage.css";

function FadeInPage({ children }: any): JSX.Element {
    const animation = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { duration: 0.1 }
        },
        exit: {
            opacity: 0,
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

export default FadeInPage;
