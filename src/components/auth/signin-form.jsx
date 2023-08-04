import Cookie from "js-cookie";
import {useState} from "react";
import {encode} from "js-base64";
import {useRouter} from "next/router";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import {Col, Container, Form, Row} from "@bootstrap";
import axios from "axios";
import {FormWrap, AlertMessage} from "@components/auth/auth.style";
import {InputField} from "@components/checkout/checkout-form.style";
import Link from "next/dist/client/link";
import {totalDays} from "@utils/method";

const defaultValue = {
    email: "",
    password: "",
};
axios.defaults.baseURL = 'https://api.3dscanit.org/';

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
                const token = response.data.token;
                    Cookie.set("access_token", encode(token), {expires: totalDays(1)});
                    router.push("/");
                }
                else{
                    setError([{message: "Something went wrong"}]);
                }
            })
            .catch(e => {
                setIsLoading(false);
                setError([{message: e.response.data.detail}]);
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
                                        <p>
                                            <Link href="signup" className="w-100 d-block">
                                                Create an account
                                            </Link>
                                        </p>
                                        <p>
                                            <Link href="/" className="w-100 d-block">
                                                Forget Password?
                                            </Link>
                                        </p>
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