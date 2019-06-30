
import mongoose from 'mongoose';
import { Customers } from './db';
import { rejects } from "assert";
import { resolve } from "dns";


export const resolvers = {
    
    Query: {
        getCustomers : (root, {limit}) => {
            return Customers.find({}).limit(limit)
        },
        getCustomer : (root, {id}) => {
            return new Promise( (resolve, object) => {
                Customers.findById( id, (error, customer) => {
                    if(error) rejects(error)
                    else resolve(customer)
                });
            });
        }
    },
    Mutation: {
        createCustomer : (root, {input}) => {
    const newCustomer = new Customers({
        name : input.name,
        lastName : input.lastName,
        company : input.company,
        emails : input.emails,
        age : input.age,
        type : input.type,
        orders : input.orders
    });
    newCustomer.id = newCustomer._id;
    
    return new Promise( (resolve, object) => {
        newCustomer.save( (error) => {
            if(error) rejects(error)
            else resolve(newCustomer)
        })
    });

},
updateCustomer : (root, {input}) => {
    return new Promise( (resolve, object) => {
        Customers.findOneAndUpdate( { _id : input.id }, input, {new:true}, (error, customer) => {
            if(error) rejects(error)
            else resolve(customer)
        });
    })
},
deleteCustomer : (root, {id}) => {
    return new Promise( (resolve, object) => {
        Customers.findOneAndRemove( { _id : id }, (error) => {
            if(error) rejects(error)
            else resolve("Customer removed successfully")
        })
    }) 
}
    }
}