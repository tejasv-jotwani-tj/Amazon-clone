import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link,useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from './reducer';
import axios from './axios';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history=useHistory();
    const [processing,setProcessing]=useState("");
    const [succeeded,setSucceeded]=useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret]=useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(()=>{
        //generate the special stripe secret which allows us to charge the customer

        const getClientSecret= async () => {
            const response= await axios({
                method:'POST',
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    },[basket]);

    console.log("the client secret is >>> ",clientSecret);

    


    const handleSubmit = async (event) => {
        //do all the fancystripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders');
        }) 
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(<Link to="/checkout">{basket?.length
                    } items</Link>)
                </h1>
                <div className="payment__section">

                    <div className="payment__title">
                        <h3> Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>React Lane</p>
                        <p>LOS Angeles, CA</p>
                    </div>


                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3> Review your items</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
                        ))}
                    </div>

                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/*stripe magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat renderText={(value) => (
                                        <h3>Order total: {value}</h3>
                                )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing||disabled||succeeded}>
                                    <span>{processing?<p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>
                            {error&&<div>{error}</div>}
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Payment
