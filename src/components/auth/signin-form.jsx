import Cookie from "js-cookie";
import {useState} from "react";
import {encode} from "js-base64";
import {useRouter} from "next/router";
import Input from "@components/ui/input";
import {totalDays} from "@utils/method";
import Button from "@components/ui/button";
import {Col, Container, Form, Row} from "@bootstrap";
import axios from "axios";
import {FormWrap, AlertMessage} from "@components/auth/auth.style";
import {InputField} from "@components/checkout/checkout-form.style";

const defaultValue = {
    email: "",
    password: "",
};
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const SigninForm = () => {
    const router = useRouter();
    const [error, setError] = useState([]);
    const [formData, setFormData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    const headers = {
        'Content-Type': 'application/json',
      }

    const onInputChange = (e) => {
        const target = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        const variables = {
                email: formData.email,
                password: formData.password,
                   };
        setIsLoading(true);
        axios.post('login/', variables,{
            headers: headers
          })
            .then(response => {
                setIsLoading(false);
                if(response){
                const token =response.Token;
                const expiresAt =
                    res?.customerAccessTokenCreate?.customerAccessToken?.expiresAt;
                Cookie.set("access_token", encode(token), {
                    expires: totalDays(expiresAt),
                });
                router.push("/account");
                }
                else{
                    this.props.history.push('/auth')

                }

            })
            .catch(e => {

                setError({
                    
                    error: {
                        error: e.response,
                        code: e.response
                    }
                });
            }) 
       
    };

    return (
        <section>
            <Container>
                <Col lg={6} className="m-auto">
                    <FormWrap>
                        <Form onSubmit={onFormSubmit} noValidate>
                            <InputField>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email *"
                                    required={true}
                                  //  value={defaultValue?.email}
                                    onChange={onInputChange}
                                />
                            </InputField>

                            <InputField>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required={true}
                                    label="Password *"
                              //      value={defaultValue?.password}
                                    onChange={onInputChange}
                                />
                            </InputField>

                            <InputField>
                                <Button
                                    tag="button"
                                    type="submit"
                                    color="white"
                                    bg="primary"
                                    hvrBg="secondary"
                                    className="w-100"
                                    fontSize="standard"
                                    loading={isLoading}
                                    textTransform="uppercase"
                                    disabled={!formData.email || !formData.password}
                                >
                                    Signin
                                </Button>
                            </InputField>

                            <InputField className="mb-0">
                                <Row>
                                    <Col md={6}>
                                        <Button
                                            tag="a"
                                            type="submit"
                                            color="white"
                                            href="/signup"
                                            hvrColor="dark"
                                            bg="secondary"
                                            hvrBg="borderLight"
                                            className="w-100"
                                            fontSize="standard"
                                            textTransform="uppercase"
                                        >
                                            Create a account
                                        </Button>
                                    </Col>

                                    <Col md={6}>
                                        <Button
                                            tag="a"
                                            href="/"
                                            color="dark"
                                            type="submit"
                                            hvrColor="white"
                                            bg="borderLight"
                                            hvrBg="secondary"
                                            className="w-100 mt-3 mt-sm-0"
                                            fontSize="standard"
                                            textTransform="uppercase"
                                        >
                                            Forget Password?
                                        </Button>
                                    </Col>
                                </Row>
                            </InputField>
                        </Form>
                    </FormWrap>

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
                </Col>
            </Container>
        </section>
    );
};

export default SigninForm;
