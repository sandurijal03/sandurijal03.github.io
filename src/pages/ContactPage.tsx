import * as React from "react";
import { InnerLayout, MainLayout } from "../styles/Layouts";
import styled from "styled-components";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import LocationOn from "@mui/icons-material/LocationOn";
import ContactItem from "../components/ContactItem";

const LazySectionThreeScene = React.lazy(
  () => import("../components/SectionThreeScene"),
);

const ContactPage = () => {
  const phone = <Phone />;
  const email = <Email />;
  const location = <LocationOn />;
  const [showScene, setShowScene] = React.useState(false);

  React.useEffect(() => {
    const shouldEnableScene = window.matchMedia("(min-width: 980px)").matches;

    if (!shouldEnableScene) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowScene(true);
    }, 360);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <MainLayout>
      <Title title={"Contact"} span={"Contact"} />

      <ContactPageStyled>
        <ContactSceneLayer>
          {showScene ? (
            <React.Suspense fallback={null}>
              <LazySectionThreeScene variant="contact" />
            </React.Suspense>
          ) : null}
        </ContactSceneLayer>
        <ContactContent>
          <InnerLayout className={"contact-section"}>
            <div className="leftContent">
              <div className="contactTitle">
                <h4>Get in touch</h4>
              </div>
              <form
                className="form"
                method="post"
                action="mailto: sandurijal03@hotmail.com"
              >
                <div className="formField">
                  <label htmlFor="name">Enter your name</label>
                  <input type="text" id="name" />
                </div>

                <div className="formField">
                  <label htmlFor="email">Enter your email</label>
                  <input type="email" id="email" />
                </div>

                <div className="formField">
                  <label htmlFor="subject">Enter your subject</label>
                  <input type="text" id="subject" />
                </div>

                <div className="formField">
                  <label htmlFor="textarea">Enter Message</label>
                  <textarea
                    name="textarea"
                    id="textarea"
                    cols={30}
                    rows={10}
                  ></textarea>
                </div>
                <div className="formField formButton">
                  <PrimaryButton title="send email" />
                </div>
              </form>
            </div>
            <div className="rightContent">
              <ContactItem
                title={"Phone"}
                icon={phone}
                contact1={"+977-9844646498"}
                contact2={""}
              />
              <ContactItem
                title={"Email"}
                icon={email}
                contact1={"sandurijal03@hotmail.com"}
                contact2={"sandurijal03@gmail.com"}
              />
              <ContactItem
                title={"Location"}
                icon={location}
                contact1={"kathmandu nepal"}
              />
            </div>
          </InnerLayout>
        </ContactContent>
      </ContactPageStyled>
    </MainLayout>
  );
};

const ContactPageStyled = styled.section`
  position: relative;

  .contact-section {
    position: relative;
    z-index: 1;
  }

  .contact-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;

    @media screen and (max-width: 978px) {
      grid-template-columns: repeat(1, 1fr);
      .formButton {
        margin-bottom: 2rem;
      }
    }

    .rightContent {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      @media screen and (max-width: 502px) {
        width: 70%;
      }
    }
    .contactTitle {
      h4 {
        color: var(--white-color);
        font-size: 1.8rem;
      }
    }
    .form {
      width: 100%;

      @media screen and (max-width: 502px) {
        width: 100%;
      }
      .formField {
        margin-top: 2rem;
        position: relative;
        label {
          position: absolute;
          left: 20px;
          top: -20px;
          display: inline-block;
          background-color: var(--background-dark-color);
          padding: 0 0.5rem;
        }
        input {
          border: 1px solid var(--border-color);
          outline: none;
          background: transparent;
          color: inherit;
          height: 3.1rem;
          padding: 0 15px;
          width: 100%;
        }
        textarea {
          background-color: transparent;
          border: 1px solid var(--border-color);
          outline: none;
          color: inherit;
          width: 100%;
          padding: 0.8rem 1rem;
        }
      }
      .formButton {
        margin-bottom: 3rem;
      }
    }
  }
`;

const ContactSceneLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.68;
  mask-image: radial-gradient(circle at 50% 52%, black, transparent 78%);
`;

const ContactContent = styled.div`
  position: relative;
  z-index: 1;
`;

export default ContactPage;
