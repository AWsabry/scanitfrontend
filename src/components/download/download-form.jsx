import Link from "next/link";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Checkbox from "@components/ui/checkout";
import {Col, Container, Form, Row} from "@bootstrap"
import {previewModeNotification} from "@utils/constant";
import {FormWrap, AlertMessage} from "@components/auth/auth.style";
import {client, customerAccessTokenCreate, customerCreate} from "@graphql";
import {InputField, InputNote} from "@components/checkout/checkout-form.style";


const defaultValue = {
    email: "",
    phone: "",
    password: "",
    policy: false,
    last_name: "",
    first_name: "",
    confirm_password: ""
}

const DownloadForm = () => {
    let cart = useSelector(state => state.shoppingCart);
    cart = Object.values(cart)
    const imageUrls = cart.map(item => 'http://api.3dscanit.org/uploads/'+item.image);
    const router = useRouter();
    const [error, setError] = useState([]);
    const [formData, setFormData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    const downloadFiles = async (urls) => {
        
        // SEND DATA TO THE BACKEND

        // DOWNLOAD THE FILE
        urls.forEach(url => {
            window.open(url);
        });

        // const promises = urls.map(async (url) => {
        //   const res = await fetch(url,{
        //     method: 'GET',
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Credentials": true,
        //         "Access-Control-Allow-Methods": "GET"
        //     }
        //   });
        //   const fileName = url.substring(url.lastIndexOf('/') + 1);
        //   const blob = await res.blob();
        //   const link = document.createElement('a');
        //   link.href = window.URL.createObjectURL(new Blob([blob]));
        //   link.setAttribute('download', fileName);
        //   document.body.appendChild(link);
        //   link.click();
        //   document.body.removeChild(link);
        // });
        // await Promise.all(promises);
      };
      
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
            input: {
                PhoneNumber: formData.phone,
                email: formData.email,
                password: formData.password,
                lastName: formData.last_name,
                firstName: formData.first_name
            }
        }
        const loginVariables = {
            input: {
                email: formData.email,
                password: formData.password
            }
        }

        
        if (formData.policy) {
            setIsLoading(true);
            downloadFiles(imageUrls);
        }
        
        setIsLoading(false);
        
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
                                    id="phone"
                                    name="phone"
                                    label="Phone *"
                                    required={true}
                                    onChange={onInputChange}
                                    placeholder="E.164 standard. ex: +16135551111."
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
                                    By confirming, you agree to our <Link href="/">Terms of Service.</Link> Learn how we
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
                                    Download
                                </Button>
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

export default DownloadForm;
