import {useState} from "react";
import Head from "next/head";
import settings from "@data/settings.json";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Form, Row} from "@bootstrap";
import {AlertMessage, FormWrap} from "@components/auth/auth.style";
import {previewModeNotification} from "@utils/constant";
import {InputField, InputNote} from "@components/checkout/checkout-form.style";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import axios from "axios";
import {useRouter} from "next/router";
import {decode, encode} from "js-base64";
import Cookie from "js-cookie";
import {totalDays} from "@utils/method";
const OTPPage = () => {
    const router = useRouter();
    const email = decode(router.query.email);
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState([]);

    const onFormSubmit = (e) => {
        // Prevent the form from being submitted
        e.preventDefault();
        setError([]);
        setIsLoading(true);
        if(otp.length === 0) {
            // OTP is empty
            setError([{
                message: "OTP is required"
            }]);
        }else{
            // Do an Ajax request
            axios.post('https://api.3dscanit.org/checkotp/'+email+'/'+otp+'/').then(response => {
                // TODO: Check this line
                if(response.data.status === "success"){
                    // Redirect to signin page
                    router.push("/signin");
                }else{
                    setError([{
                        message: 'Your OTP is invalid!'
                    }]);
                }
                setIsLoading(false);
            }).catch(error => {
                if(error.response.data.Status == 'The User Already Active and Authenticated'){
                    router.push("/signin");
                }
                setError([{ message: error.response.data.Status}]);
                setIsLoading(false);
            })
        }
    }
    const onInputChange = (e) => {
        // Set the OTP value
        setOtp(e.target.value);
    }
    return (
        <Layout>
            <Head>
                <title>{"OTP Verification :: " + settings?.title}</title>
                <meta name="description" content={settings?.title}/>
            </Head>

            <Breadcrumb
                py={[40, 80]}
                mb={[60, null, 100]}
                pageTitle="OTP Verification"
            />
            <section>
                <Container>
                    <Col lg={6} className="m-auto">
                        <FormWrap>
                            <Form onSubmit={process.env.NEXT_PUBLIC_DEMO_MODE === "true" ? previewModeNotification : onFormSubmit} noValidate>
                                <InputField>
                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        label="OTP *"
                                        required={true}
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
                                    >
                                        Submit
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
        </Layout>
    );
};

export default OTPPage;
