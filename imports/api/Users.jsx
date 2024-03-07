import { Meteor } from 'meteor/meteor';


if (Meteor.isServer) {

    Meteor.publish('allUsers', function () {
        return Meteor.users.find({});
    })

    Meteor.publish('currentUser', function () {
        return Meteor.user();
    })

    Meteor.publish('find_by_username', function (name) {
        return Accounts.findUserByUsername(name);
    })

    Meteor.publish('users.all', () => {
        return [
            Meteor.users.find()
        ];
    });
}