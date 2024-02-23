import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

// Création d'une collection Sondages
const SondagesCollection = new Mongo.Collection('sondages');

export default SondagesCollection;


