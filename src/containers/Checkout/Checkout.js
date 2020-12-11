import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

//Components 
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0 
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);

        const ingredientObj = {};
        let price = 0; 

        for ( let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } 
            else {
                ingredientObj[param[0]] = + param[1];
            }
        }

        this.setState({ingredients: ingredientObj, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log(this.props);
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => 
                            (<ContactData ingredients={this.state.ingredients} 
                                          price={this.state.totalPrice} 
                                          {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;