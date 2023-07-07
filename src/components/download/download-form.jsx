import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import {Col, Container, Form, Row} from "@bootstrap"
import {previewModeNotification} from "@utils/constant";
import {FormWrap, AlertMessage} from "@components/auth/auth.style";
import {client, productsQuery} from "@graphql";
import {InputField} from "@components/checkout/checkout-form.style";
import axios from "axios";


const defaultValue = {
    email: "",
    phone: "",
}

const DownloadForm = () => {
    const router = useRouter();
    const [error, setError] = useState([]);
    const [formData, setFormData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);
    // Fetch all products
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const productsCollection = await client(productsQuery(), 'getProducts/');
        setProducts(productsCollection.allProducts)
    }, []);

      
    const onInputChange = e => {
        const target = e.target;
        setFormData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        const input = {
            PhoneNumber: formData.phone,
            email: formData.email,
            product: parseInt(formData.product)
        }
        setIsLoading(true);
        // Send the request to backend
        axios.post('http://api.3dscanit.org/orders', input)
        .then((response) => {
            // Show success message
        }, (error) => {
            // Show error message
            setError([{message: "Something went wrong"}])
        });
        setIsLoading(false);
    }
    return (
        <section>
            <Container>
                <Col lg={6} className="m-auto">
                    <FormWrap>
                        <Form onSubmit={process.env.NEXT_PUBLIC_DEMO_MODE === "true" ? previewModeNotification : onFormSubmit} noValidate>
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
                                <label style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}>Product *</label>
                                <select
                                    id="product"
                                    name="product"
                                    required={true}
                                    onChange={onInputChange}
                                    style={{
                                        width: '100%',
                                        height: '50px',
                                        padding: '0 20px',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '4px',
                                        color: '#6e6e6e',
                                        backgroundColor: '#fff',
                                        fontSize: '18px',
                                    }}
                                >
                                    {products.map( (item, idx) => {
                                        return (
                                            <option key={idx} value={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>

                            </InputField>


                            <InputField>
                                <Input
                                    id="phone"
                                    name="phone"
                                    label="Phone *"
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
