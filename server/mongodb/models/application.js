import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    salesLastWeek: {type: String, required: true},
    salesBeforeLastWeek: {type: String, required: true},
    businessActivity: {type: String, required: true},
    selectedBusinessType: {type: String, required: true},
    selectedBusinessLocation: {type: String, required: true},
    businessAreaPicBlob: {type: String, required: true},
    ownerInBusinessPicBlob: {type: String, required: true},
    outsideOfBusinessPicBlob: {type: String, required: true},
    durationInBsuiness: {type: String, required: true},
    age: {type: String, required: true},
    nationalIDFrontPicBlob: {type: String, required: true},
    fullName: {type: String, required: true},
    nationalIDNumber: {type: String, required: true},
    nextOfKinName: {type: String, required: true},
    nextOfKinRelationship: {type: String, required: true},
    nextOfKinPhoneNumber: {type: String, required: true},
    referee1Name: {type: String, required: true},
    referee1PhoneNumber: {type: String, required: true},
    referee1KnownPeriod: {type: String, required: true},
    NINofReferee1: {type: String, required: true},
    ref1NationalIDPic: {type: String, required: true},
    referee2Name: {type: String, required: true},
    referee2PhoneNumber: {type: String, required: true},
    referee2KnownPeriod: {type: String, required: true},
    NINofReferee2: {type: String, required: true},
    ref2NationalIDPic: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
const ApplicationModel = mongoose.model('Application', ApplicationSchema)

export default ApplicationModel