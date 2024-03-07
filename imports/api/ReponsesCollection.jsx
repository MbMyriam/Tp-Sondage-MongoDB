import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";
import 'meteor/aldeed:collection2/static';

// Création d'une collection Reponses
const ReponsesCollection = new Mongo.Collection('reponses');

export default ReponsesCollection;

const ReponseSchema = new SimpleSchema({
    sondage_id: String,
    utilisateur_id: String,
    reponses: {
        type: Array,
        optional: true,
    },
    'reponses.$': Object,
    'reponses.$.question_id': {
        type: String,
        optional: true,
    },
    'reponses.$.reponse': {
        type: Array,
        optional: true,
    },
    'reponses.$.reponse.$': Object,
    'reponses.$.reponse.$.proposition': {
        type: String,
        optional: true,
    },
    createdAt: Date
});

const ReponsesSchema = new SimpleSchema({
    reponse: ReponseSchema
});

ReponsesCollection.attachSchema(ReponsesSchema);

// Exécuté uniquement sur le serveur
if (Meteor.isServer) {
    Meteor.publish('allReponsesCollection', function () {
        // Renvoi tous les reponses de la collection
        return ReponsesCollection.find();
    });

    Meteor.publish('oneReponsesCollection', (id) => {
        return ReponsesCollection.find({ _id: id });
    });

    Meteor.publish('mesReponsesCollection', function () {
        return ReponsesCollection.find({ 'reponse.utilisateur_id': this.userId })
    });

    //Méthode côté serveur qu'on peut appeler côté client insert
    Meteor.methods({
        insertNewReponse(sondage_id, question_id, reponsesReponse) {
            ReponsesCollection.insert({
                reponse: {
                    sondage_id: sondage_id,
                    utilisateur_id: Meteor.userId(),
                    reponses: [{
                        question_id: question_id,
                        reponse:[ {
                            proposition: reponsesReponse
                        }]
                    }],
                    createdAt: new Date(),
                }
            });
        },
    });
};




