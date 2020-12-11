import React, { Component } from 'react';
import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }


    componentDidMount () {
        axios.get('/orders.json')
        .then(response => {
            const fetchOrders = []; 
            for (let key in response.data){
                fetchOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchOrders});
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }

}

export default withErrorHandler(Orders, axios);