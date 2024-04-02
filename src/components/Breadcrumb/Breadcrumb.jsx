import React from 'react';
import "./breadcrumb.css"

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
      <ul>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.label}>
              {isLast ? (
                <span>{crumb.label}</span>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="separator">/</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
