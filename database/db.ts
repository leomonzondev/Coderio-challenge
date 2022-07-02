import mongoose from "mongoose";


/**
 * 0 = Disconnected
 * 1 = Connected
 * 2 = Connecting
 * 3 = Disconnecting
 */

const mongooConnection = {
    isConnected: 0,
}

export const connect = async() => {

    if( mongooConnection.isConnected ) {
        console.log('Connection enabled')
        return
    }

    if ( mongoose.connections.length > 0 ) {
        mongooConnection.isConnected = mongoose.connections[0].readyState

        if( mongooConnection.isConnected === 1 ) {
            console.log('Using last connection')
        }
        await mongoose.disconnect()
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongooConnection.isConnected = 1
    console.log('Connected to MongoDB:', process.env.MONGO_URL)

}

export const disconnect = async() => {

    if( process.env.NODE_ENV === 'production' ) return

    if( mongooConnection.isConnected === 0) return

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')

}