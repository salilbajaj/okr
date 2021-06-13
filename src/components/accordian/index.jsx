import React, { useState } from "react";
import "./style.css";
import CollapsibleContent from "../collapsible-content";
import User from "../../assets/user.svg";
import ArrowRight from "../../assets/arrow-right.svg";
import ArrowDown from "../../assets/arrow-down.svg";
import { Modal } from "../modal";
import PropTypes from "prop-types";

// Accordian component to display parent child objective and keys
const Accordion = ({ title, objective }) => {
  const [isActive, setIsActive] = useState(true); // state to track if current accordian is open or closed
  const [modalOpen, setModalOpen] = useState(false); // state to track if title of objective is clicked to show pop up
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>
          {isActive ? (
            <img src={ArrowDown} className="accordian-angle" alt="arrow" />
          ) : (
            <img src={ArrowRight} className="accordian-angle" alt="arrow" />
          )}
        </div>

        <img src={User} className="user-img" alt="user" />

        <div onClick={(e) => (setModalOpen(!modalOpen), e.stopPropagation())}>
          {title}
        </div>
      </div>
      {isActive && objective?.children.length ? (
        <CollapsibleContent keyResults={objective.children} />
      ) : null}
      <Modal
        modalData={objective}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  objective: PropTypes.object,
};

export default Accordion;
