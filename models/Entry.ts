import mongoose, { Model, Schema  } from "mongoose";


export interface IEntry {
    timezone: string;
    datetime: string;
}

const entrySchema = new Schema({
    timezone: { type: String, required: true} ,
    datetime: { type: String, required: true},
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            msg: '{VALUE} no es un estado permitido'
        },
    }
})

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel