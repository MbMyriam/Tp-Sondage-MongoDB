import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

// Création d'une collection Sondages
const SondagesCollection = new Mongo.Collection('sondages');

export default SondagesCollection;

const SondageSchema = new SimpleSchema({
    nom: String,
    createur: String,
    questions: {
        type: Array,
        optional: true,
    },
    'questions.$': Object,
    'questions.$.id': {
        type: String,
        optional: false,
    },
    'questions.$.intitule': {
        type: String,
        optional: true,
    },
    'questions.$.type': {
        type: String,
        optional: true,
    },
    'questions.$.createdAt': {
        type: Date,
        optional: false,
    },
    réponses: {
        type: Array,
        optional: true,
    },
    'reponses.$': {
        type: String,
        optional: true,
    },
    createdAt: Date
});

const SondagesSchema = new SimpleSchema({
    sondage: SondageSchema
});

SondagesCollection.attachSchema(SondagesSchema);

// Exécuté uniquement sur le serveur
if (Meteor.isServer) {
    Meteor.publish('allSondagesCollection', function () {
        // Renvoi tous les sondages de la collection
        return SondagesCollection.find();
    });

    Meteor.publish('oneSondagesCollection', (id) => {
        return SondagesCollection.find({ _id: id });
    });

    Meteor.publish('mesSondagesCollection', function () {
        return SondagesCollection.find({ 'sondage.createur': this.userId })
    });

    //Méthode côté serveur qu'on peut appeler côté client insert
    Meteor.methods({
        insertNewSondage(nomSondage, sondageCreateurId, questionsSondage) {
            SondagesCollection.insert({
                sondage: {
                    nom: nomSondage,
                    createur: sondageCreateurId,
                    questions: questionsSondage,
                    createdAt: new Date(),
                }
            });
        },
    })
}




