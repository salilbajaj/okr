import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import User from "../../assets/user.svg";

// Component to display collapsible content inside accordian
const CollapsibleContent = ({ keyResults }) => {
  return (
    <div className="collapsible-content">
      <ol className="collapsible-list">
        {keyResults?.length &&
          keyResults.map((child) => {
            return (
              <li type="a" key={child?.id}>
                <img src={User} className="collapsible-user-img" alt="user" />
                {child.title}
              </li>
            );
          })}
      </ol>
    </div>
  );
};

CollapsibleContent.propTypes = {
  keyResults: PropTypes.array,
};

export default CollapsibleContent;
