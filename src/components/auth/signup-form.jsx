import Link from "next/link";
import {useState} from "react";
import Cookie from "js-cookie";
import {encode} from "js-base64";
import {useRouter} from "next/router";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Checkbox from "@components/ui/checkout";
import {Col, Container, Form, Row} from "@bootstrap"
import {previewModeNotification} from "@utils/constant";
import {FormWrap, AlertMessage} from "@components/auth/auth.style";
import {InputField, InputNote} from "@components/checkout/checkout-form.style";
import axios from "axios";
import {totalDays} from "@utils/method";

const headers = {
    'Content-Type': 'application/json',
}
const defaultValue = {
    email: "",
    phone: "",
    password: "",
    policy: false,
    last_name: "",
    first_name: "",
    confirm_password: ""
}

const SignupForm = () => {
    const router = useRouter();
    const [error, setError] = useState([]);
    const [formData, setFormData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    const onInputChange = e => {
        const target = e.target;
        if (target.type === "checkbox") {
            if (target.checked) {
                setFormData(prevState => ({
                    ...prevState,
                    policy: true
                }))
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    policy: false
                }))
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [target.name]: target.value
            }))
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        const variables = {
            PhoneNumber: formData.phone,
            email: formData.email,
            password: formData.password,
            city: formData.city,
            last_name: formData.last_name,
            first_name: formData.first_name
        }
        const loginVariables = {
            input: {
                email: formData.email,
                password: formData.password
            }
        }
        if (formData.password === formData.confirm_password) {
            setIsLoading(true);
            // Send REST api request to the server
            axios.post('http://api.3dscanit.org/register/', variables, {
                headers: headers
            }).then(res => {
                // Sign the user in
                axios.post('http://api.3dscanit.org/login/', variables,{
                    headers: headers
                })
                .then(response => {
                    setIsLoading(false);
                    if(response){
                        const token = response.data.token;
                        Cookie.set("access_token", encode(token), {expires: totalDays(1)});
                        router.push("/account");
                    }
                    else{
                        setError([{message: 'Failed to login'}]);
                    }
                })
                .catch(e => {
                    setError([{message: "Something went wrong"}]);
                })
            }).catch(err => {
                // Show error somewhere
                setError([{message: err.message}]);
            });
            // Disable loading indicator
            setIsLoading(false);
        } else {
            setError([{message: "Password don't match!"}])
        }
    }


    return (
        <section>
            <Container>
                <Col lg={6} className="m-auto">
                    <FormWrap>
                        <Form onSubmit={process.env.NEXT_PUBLIC_DEMO_MODE === "true" ? previewModeNotification : onFormSubmit}
                              noValidate>
                            <Row>
                                <Col md={6}>
                                    <InputField>
                                        <Input
                                            id="first_name"
                                            name="first_name"
                                            label="First Name *"
                                            required={true}
                                            onChange={onInputChange}
                                        />
                                    </InputField>
                                </Col>

                                <Col md={6}>
                                    <InputField>
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            label="Last Name *"
                                            required={true}
                                            onChange={onInputChange}
                                        />
                                    </InputField>
                                </Col>
                            </Row>

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
                                    id="city"
                                    name="city"
                                    type="text"
                                    label="City *"
                                    required={true}
                                    onChange={onInputChange}
                                />
                            </InputField>

                            <InputField>
                                <Input
                                    id="phone"
                                    name="phone"
                                    label="Phone *"
                                    required={true}
                                    onChange={onInputChange}
                                    placeholder="E.164 standard. ex: +16135551111."
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
                                <Input
                                    required={true}
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    label="Confirm Password *"
                                    onChange={onInputChange}
                                />
                            </InputField>

                            <InputField>
                                <Checkbox
                                    id="policy"
                                    name="policy"
                                    label="I've read and accept the Privacy Policy"
                                    onChange={onInputChange}
                                />

                                <InputNote className="mt-3">
                                    By signing up, you agree to our <Link href="/">Terms of Service.</Link> Learn how we
                                    collect and use your data in our <Link href="/">Privacy Policy.</Link>
                                </InputNote>
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
                                    disabled={!formData.policy}
                                >
                                    Signup
                                </Button>
                            </InputField>

                            <Button
                                tag="a"
                                href="/signin"
                                type="submit"
                                color="dark"
                                bg="borderLight"
                                hvrColor="white"
                                hvrBg="secondary"
                                className="w-100"
                                fontSize="standard"
                                textTransform="uppercase"
                            >
                                Already have a account?
                            </Button>
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

export default SignupForm;
