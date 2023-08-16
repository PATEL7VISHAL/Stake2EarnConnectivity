import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
console.log("showMobileMenu", showMobileMenu);
  return (
    <header id="header" className="sticky-top-slide">
      <nav className="primary-menu navbar navbar-expand-lg navbar-dark bg-transparent fw-500">
        <div className="container position-relative">
          <div className="col-auto col-lg-auto">
            <a className="logo" href="index.html" title="Scott">
              {" "}
              <img src={require("./assets/logohrs5.png")} alt="Scott" />{" "}
            </a>
          </div>
          <div className="col col-lg-10 navbar-accordion">
            <button
              className="navbar-toggler ms-auto"
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div
              id="header-nav"
              className={`collapse ${showMobileMenu ? 'show' : ''} navbar-collapse justify-content-end`}
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Roadmap
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Collection
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Team
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Convert
                  </a>
                </li>

                <li className="align-items-center h-auto mt-2 mt-lg-0 ms-lg-2">
                  <a
                    className="btn btn-primary rounded-pill d-inline-block"
                    href="/"
                  >
                    <span className="me-1">
                      <i className="fas fa-wallet"></i>
                    </span>{" "}
                    Stake
                  </a>
                </li>
                <li className="align-items-center h-auto mt-2 mt-lg-0 ms-lg-3">
                  <a
                    className="btn btn-light rounded-pill d-inline-block"
                    href="https://discord.gg/hashrateservers"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="me-1">
                      <i className="fab fa-discord"></i>
                    </span>{" "}
                    Discord
                  </a>
                </li>
                <li className="align-items-center h-auto mt-2 mt-lg-0 ms-lg-3">
                  <WalletMultiButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
