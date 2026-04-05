import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    action: {
        type: String,
        enum: ['BUY', 'SELL'],
        required: true
    },
    product: {
        type: String,
        enum: ['CNC', 'MIS', 'NRML', 'SL', 'SL-M'],
        required: true
    },
    type: {
        type: String,
        enum: ['MARKET', 'LIMIT', 'STOP LOSS', 'SL-M'],
        required: true
    },
    status: {
        type: String,
        enum: ['OPEN', 'CLOSED', 'REJECTED'],
        default: 'PENDING'
    },
    limitPrice: {
        type: Number,
        default: 0
    },
    stopLossPrice: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

export default mongoose.model('Order', orderSchema);