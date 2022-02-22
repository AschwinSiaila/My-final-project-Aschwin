import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="footer container">
      <div className="footer-section">
        <p className="title">AschwinRecipeApp</p>
        <p>Aschwin's recipe App is a place where you can please your soul and tummy with delicious food recepies of all cuisine. And our service is absolutely free.</p>
        <p>&copy; 2022 | All Rights Reserved</p>
      </div>
      <div className="footer-section">
        <p className="title">Contact Us</p>
        <p>AsReApp@gmail.com</p>
        <p>+12-345-678-90</p>
        <p>Mgr Nolenslaan 814</p>
      </div>
      <div className="footer-section">
        <p className="title">Socials</p>
        <p>Facebook</p>
        <FontAwesomeIcon icon={faFacebook} />
        <p>Twitter</p>
        <FontAwesomeIcon icon={faTwitter} />
        <p>Instagram</p>
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </div>
  );
};

export default Footer;
