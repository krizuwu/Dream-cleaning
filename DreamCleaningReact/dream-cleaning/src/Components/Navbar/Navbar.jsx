
import styles from './navbar.module.css';

function Navbar() {
  return (
    <>
    <nav className={styles.menuContainer}>
    {/* <!-- burger menu --> */}
    <input type="checkbox" aria-label="Toggle menu" />
    <span></span>
    <span></span>
    <span></span>
  
    {/* <!-- logo --> */}
    <a href="#" className={styles.menuLogo}>
      <img src="https://i.ibb.co/KxXHQXp/logodreamco-Convert-Image.png" alt="My Awesome Website"/>
    </a>
  
    {/* <!-- menu items --> */}
    <div className={styles.menu}>
      <ul>
        <li>
          <a href="#home">
            Home
          </a>
        </li>
        <li>
          <a href="#pricing">
            Cleaning Services
          </a>
        </li>
        <li>
          <a href="#blog">
            Contact
          </a>
        </li>
        <li>
          <a href="#docs">
            About Us
          </a>
        </li>
      </ul>
      <ul>
      </ul>
      
      
    </div>
  </nav>
  </>
  );
}

export default Navbar;
