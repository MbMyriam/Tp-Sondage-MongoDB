import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState } from 'react';
import { withTracker, useTracker } from 'meteor/react-meteor-data';
import SondagesCollection from '../api/SondagesCollection';
import {Link} from 'react-router-dom';

export const Sondage = () => {
    const user = useTracker(() => Meteor.user());
    const logout = () => Meteor.logout();
    const { listSondages, ready } = useTracker(() => {
        const subscription = Meteor.subscribe('allSondagesCollection');
        return {
            listSondages: SondagesCollection.find().fetch(),
            ready: subscription.ready()
        };
    });
    if (!ready) {
        <h1>ok</h1>
    }

    return (
        <div>
            {listSondages.map((sondage, idx) => {
                return <div sondage={sondage} key={idx}>
                            <Link to={"/sondage/" + sondage._id}>{sondage.sondage.nom}</Link>
                        </div>
            })}

        </div>
    )
};