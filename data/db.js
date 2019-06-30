import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/graphql-server', { useNewUrlParser: true })
.then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const customerSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    company: String,
    emails: Array,
    age: Number,
    type: String,
    orders: Array
});

const Customers = mongoose.model('customers', customerSchema );

export { Customers };

