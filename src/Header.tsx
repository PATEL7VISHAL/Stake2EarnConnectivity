import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  console.log("showMobileMenu", showMobileMenu);
  return (
    <header id="header" className="sticky-top-slide">
      <nav className="primary-menu navbar navbar-expand-lg navbar-dark bg-transparent fw-500">
        <div className="container-fluid position-relative">
          <div className="row">
            <div className="col-10">
              <div className="logo" title="Scott">
                {" "}
                <img
                  src={require("./assets/logohrs5.png")}
                  alt="Scott"
                  width="100%"
                />{" "}
              </div>
            </div>
            <div className="col-2 navbar-accordion">
              <button
                className="navbar-toggler mx-auto"
                type="button"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <img src={require("./assets/menu.png")} alt="" />
                {/* <span></span>
                <span></span>
                <span></span> */}
              </button>
            </div>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-12">
            <div
              id="header-nav"
              className={`collapse ${
                showMobileMenu ? "show" : ""
              } navbar-collapse justify-content-end`}
            >
              <ul className="navbar-nav">
                <li className="nav-item my-auto">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item my-auto">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item my-auto">
                  <a className="nav-link" href="#">
                    Roadmap
                  </a>
                </li>
                <li className="nav-item my-auto">
                  <a className="nav-link" href="#">
                    Collection
                  </a>
                </li>
                <li className="nav-item my-auto">
                  <a className="nav-link" href="#">
                    Team
                  </a>
                </li>
                <li className="nav-item my-auto">
                  <a className="nav-link" href="#">
                    FAQ
                  </a>
                </li>
                <li className="nav-item my-auto">
                  <a className="nav-link" href="#">
                    Convert
                  </a>
                </li>
                <li className="nav-item my-auto">
                  <NavLink className="nav-link" to="/upgrade">
                    Upgrade
                  </NavLink>
                </li>
                <li className="align-items-center h-auto my-auto ms-lg-2 border-0 nb-btn">
                  <NavLink
                    className="btn btn-primary rounded-pill d-inline-block"
                    to="/"
                  >
                    <span className="me-1">
                      <i className="fas fa-wallet"></i>
                    </span>{" "}
                    Stake
                  </NavLink>
                </li>
                {/* <li className="align-items-center h-auto my-auto ms-lg-2 nb-btn">
                  <NavLink
                    className="btn btn-primary rounded-pill d-inline-block"
                    to="/admin"
                  >
                    <span className="me-1">
                      <i className="fas fa-wallet"></i>
                    </span>{" "}
                    Admin
                  </NavLink>
                </li> */}
                <li className="align-items-center h-auto my-auto ms-lg-3 border-0 nb-btn">
                  <a
                    className="btn btn-dark rounded-pill d-inline-block"
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
                <li className="align-items-center h-auto my-auto ms-lg-3 border-0 nb-btn">
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
