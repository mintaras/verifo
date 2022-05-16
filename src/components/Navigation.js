import { Link, useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import classnames from "classnames";
import styles from "./Navigation.module.scss";

function Navigation() {
  const location = useLocation();
  const [isNavExpanded, setNavExpanded] = useState(false);

  const handleNavToggleClick = () => {
    setNavExpanded((isNavExpanded) => !isNavExpanded);
  };

  const getNavLinkClassNames = useCallback(
    (path) => {
      return `nav-link ${path === location.pathname ? "active" : ""}`;
    },
    [location]
  );

  return (
    <nav className={classnames("navbar navbar-expand-lg navbar-light", styles["navbar"])}>
      <div className="container-fluid">
        <button onClick={handleNavToggleClick} className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={classnames("collapse navbar-collapse", styles["navbar-collapse"], { show: isNavExpanded })}>
          <div className="navbar-nav">
            <Link className={getNavLinkClassNames("/")} to="/" onClick={() => setNavExpanded(false)}>
              Transfer
            </Link>
            <Link
              className={getNavLinkClassNames("/transactions")}
              to="/transactions"
              onClick={() => setNavExpanded(false)}
            >
              Transactions
            </Link>
          </div>
          <button onClick={() => setNavExpanded(false)} type="button" className="btn-close" aria-label="Close"></button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
