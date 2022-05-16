import "./Footer.css";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  
  
  return (
    <div className="footer">
      <div id="container">
        <footer className="footer text-center text-white">
          <div className="container p-4">
            <section className="mb-5">
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.facebook.com/TrueGas1991/"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <FaFacebookF className="footer__icon facebook" />
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.twitter.com/"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <ImTwitter className="footer__icon twiter" />
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                role="button"
                href="https://www.instagram.com/nir.yitzhari/"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillInstagram className="footer__icon instagram" />
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href=" https://www.linkedin.com/in/nir-itzhari-59812522b/"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <FaLinkedinIn className="footer__icon linkedin" />
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://github.com/nir-itzhari?tab=projects"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <FaGithub className="footer__icon github" />
              </a>
            </section>
            <section className="">
              <form action="">
                <div className="row d-flex justify-content-center">
                  <div className="col-auto">
                    <p className="pt-2 text-white">
                      <strong>Sign up for our newsletter</strong>
                    </p>
                  </div>
                  <div className="col-md-5 col-12">
                    <div className="form-outline form-white mb-4">
                      <input placeholder="Email address" type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-outline-light mb-4">
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </section>
            <section className="mb-4 mt-5 text-white">
              <p className="text-white">
                Created with ReactTS | Node.js(TS) | MySQL
              </p>
              <p>
                <span className="text-white">Made by Nir Itzhari all rights reserved 2022 ©®</span>
              </p>
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
