import * as React from "react";
import styled from "styled-components";

type ContactItemProps = {
  icon: Element | any;
  title: string;
  contact1: string;
  contact2?: string;
};

const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  title,
  contact1,
  contact2,
}) => {
  return (
    <ContactItemStyled>
      <div className="leftContent">
        <p>{icon}</p>
      </div>
      <div className="rightContent">
        <h6>{title}</h6>
        <p>{contact1}</p>
        <p>{contact2}</p>
      </div>
    </ContactItemStyled>
  );
};

const ContactItemStyled = styled.div`
  padding: 1.5rem 2rem;
  background-color: var(--background-dark-gray);
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .leftContent {
    padding: 1.8rem;
    border: 1px solid var(--border-color);
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    svg {
      font-size: 2.3rem;
    }
  }

  .rightContent {
    min-width: 0;

    h6 {
      color: var(--white-color);
      font-size: 1.2rem;
      padding-bottom: 0.6rem;
    }

    p {
      padding: 0.1rem 0;
      font-size: 0.92rem;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }
  }

  @media screen and (max-width: 640px) {
    padding: 1rem;
    align-items: flex-start;
    gap: 0.8rem;

    .leftContent {
      padding: 0.8rem;
      margin-right: 0;

      svg {
        font-size: 1.4rem;
      }
    }

    .rightContent {
      h6 {
        font-size: 1rem;
        padding-bottom: 0.3rem;
      }

      p {
        font-size: 0.84rem;
      }
    }
  }
`;

export default ContactItem;
