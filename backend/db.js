const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://roybabu1452:6202ANKIT@cluster0.k5nuf.mongodb.net/Royfood?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');

        // Fetch the food_items collection
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        
        // Store data globally
        global.food_items = fetched_data;
        console.log("Food items fetched:", global.food_items); 

        //food category
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        
        //store data globally
        global.foodCategory = foodCategory;
        console.log("Food items fetched:", global.foodCategory); 

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process only on connection failure
    }
};

module.exports = mongoDB;
