import { Schema } from 'mongoose';
import db from '../database';

const statsVerifiedDnaSchema = new Schema({
    withMutation: Number,
    withoutMutation: Number
});

export default db.model('statsverifieddna', statsVerifiedDnaSchema);