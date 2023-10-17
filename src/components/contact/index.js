import { Container, Col, Row, Form } from "@bootstrap";
import {
  ContactMap,
  ContactWrapper,
  ContactInfoItem,
  ContactContentWrap,
  ContactContentTitle,
  ContactInfoMethod,
  ContactInfoText,
  ContactForm,
} from "@components/contact/contact.style";
import { InputField } from "@components/checkout/checkout-form.style";
import Input, { TextArea } from "@components/ui/input";
import Button from "@components/ui/button";
import { useState } from "react";
import axios from "axios";
import { AlertMessage } from "@components/auth/auth.style";

const defaultValue = {
  subject: "",
  email: "",
  message: "",
};
axios.defaults.baseURL = "https://api.3dscanit.org/";

const Contact = (props) => {
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);

  const headers = {
    "Content-Type": "application/json",
  };

  const onInputChange = (e) => {
    const target = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const variables = {
      subject: formData.subject,
      email: formData.email,
      message: formData.message,
    };
    setIsLoading(true);
    axios
      .post("contactUs/", variables, {
        headers,
      })
      .then((response) => {
        setIsLoading(false);
        if (response) {
          console.log(response);
          if (response.status === 200) {
            setSuccessMsg([
              { message: "Your message has been sent successfully" },
            ]);
          }
        } else {
          setError([{ message: "Something went wrong" }]);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        setError([{ message: e.response.data }]);
      });
  };

  return (
    <ContactWrapper {...props}>
      <Container>
        <ContactMap mb={60}>
          <iframe src="https://maps.google.com/maps?q=121%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia&t=&z=13&ie=UTF8&iwloc=&output=embed" />
        </ContactMap>

        <Row>
          <Col lg={4}>
            <ContactContentWrap className="h-100">
              <ContactContentTitle>Contact Info</ContactContentTitle>

              <ContactInfoItem>
                <ContactInfoMethod>Phone:</ContactInfoMethod>
                <ContactInfoText>
                  <p>
                    <a href="tel:+012345678102">+012 345 678 102</a>
                  </p>
                  <p>
                    <a href="tel:+012345678203">+012 345 678 203</a>
                  </p>
                </ContactInfoText>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoMethod>Email:</ContactInfoMethod>
                <ContactInfoText>
                  <p>
                    <a href="mailto:email@here.com">email@here.com</a>
                  </p>
                  <p>
                    <a href="mailto:your@email.here">your@email.here</a>
                  </p>
                </ContactInfoText>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoMethod>Address:</ContactInfoMethod>
                <ContactInfoText>
                  <p>Address goes here,</p>
                  <p>street, Crossroad 123.</p>
                </ContactInfoText>
              </ContactInfoItem>
            </ContactContentWrap>
          </Col>

          <Col lg={8}>
            <ContactContentWrap mt={[30, null, null, 0]}>
              <ContactContentTitle>Get In Touch</ContactContentTitle>

              <ContactForm>
                <Form onSubmit={onFormSubmit}>
                  <InputField>
                    <Row>
                      <Col md={6}>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          label="Email *"
                          required={true}
                          onChange={onInputChange}
                        />
                      </Col>

                      {/* <Col md={6} className="mt-3 mt-md-0">
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    label="Last Name"
                                                />
                                            </Col> */}
                    </Row>
                  </InputField>

                  <InputField>
                    <Input
                      id="subject"
                      name="subject"
                      label="Subject"
                      required={true}
                      onChange={onInputChange}
                    />
                  </InputField>

                  <InputField>
                    <TextArea
                      rows={8}
                      id="message"
                      name="message"
                      label="Message"
                      required={true}
                      onChange={onInputChange}
                    />
                  </InputField>

                  <Button
                    tag="button"
                    type="submit"
                    color="white"
                    bg="primary"
                    hvrBg="secondary"
                    className="w-100"
                    fontSize="standard"
                    textTransform="uppercase"
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    Send Message
                  </Button>
                </Form>
              </ContactForm>
              {error.length > 0 && (
                <AlertMessage
                  mt={3}
                  color="danger"
                  isOpen={error}
                  onClick={() => setError([])}
                >
                  <ul>
                    {error.map((item, idx) => (
                      <li key={idx}>{item?.message}</li>
                    ))}
                  </ul>
                </AlertMessage>
              )}
              {successMsg.length > 0 && (
                <AlertMessage
                  mt={3}
                  color="success"
                  isOpen={successMsg}
                  onClick={() => setSuccessMsg([])}
                >
                  <ul>
                    {successMsg.map((item, idx) => (
                      <li key={idx}>{item?.message}</li>
                    ))}
                  </ul>
                </AlertMessage>
              )}
            </ContactContentWrap>
          </Col>
        </Row>
      </Container>
    </ContactWrapper>
  );
};

export default Contact;
