import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState( {loading: true} );

        const order = {
             ingredients: this.props.ingredients,
             price: this.props.price,
             customerData: {
                 name: 'Julio Rivas',
                 address: {
                     street: 'TestStreet 1',
                     postalCode: 'N1A 1A1',
                     country: 'Canada'
                 },
                 email: 'test@test.com'
             },
             deliveryMethod: 'fastest'
        }

        //sending dummy order 
        axios.post('/orders.json', order)
        .then(response => {
            this.setState( {loading: false} );
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState( {loading: false} );
            console.log('Error Msg:' + error);
        });
    }

    render () {

        let form = (
            <form>
                <div className="form-group">
                    <label htmlFor="UsersName">Name</label>
                    <input type="text" className="form-control" id="UsersName" name="name" placeholder="Your Name"/>
                </div>

                <div className="form-group">
                    <label htmlFor="UsersEmail">Email Address</label>
                    <input type="email" className="form-control" id="UsersEmail" name="email" placeholder="Your Email" aria-describedby="emailHelp"/>
                    <small id="emailHelp" className="form-text text-muted">Don't worry, we won't share your email with others.</small>
                </div>
                
                <div className="form-group">
                    <label htmlFor="UsersStreetAddress">Street Adress</label>
                    <input type="text" id="UsersStreetAddress" className="form-control" name="street" placeholder="Street Name"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="UsersPostalCode">Postal Code</label>
                    <input type="text" className="form-control" name="postalCode" placeholder="Postal Code"/>
                </div>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        ); 

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4> Enter Your contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData
