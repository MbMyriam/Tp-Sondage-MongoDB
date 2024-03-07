import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState } from 'react';
import { withTracker, useTracker } from 'meteor/react-meteor-data';
import SondagesCollection from '../../api/SondagesCollection';

export const Sondage = () => {
    const { id } = useParams();
    const user = useTracker(() => Meteor.user());
    const logout = () => Meteor.logout();
    const { sondage,listSondages, ready } = useTracker(() => {
        const subscriptionOne = Meteor.subscribe('oneSondagesCollection', id);
        const subscription = Meteor.subscribe('allSondagesCollection');
        return {
            sondage: SondagesCollection.findOne({ _id: id }),
            listSondages: SondagesCollection.find().fetch(),
            ready: subscription.ready() && subscriptionOne.ready()
        };
    }, [id]);

    if (!ready) {
        <h1>ok</h1>
    }

    return(
        <div>
          {user ? (
                    <Fragment>
                        <header >
                            <div className="app-bar">
                                <div className="user" onClick={logout}>
                                    {user.username} 🚪
                                </div>
                                <hr />
                            </div>
                        </header>
                        <section>
                        <div>
                             <h3>Nom : {sondage.sondage.nom}</h3>
                            {/*  <h3>Question : {sondage.sondage.questions.intitule}</h3>
                            <h3>Réponses : {sondage.sondage.reponses}</h3>*/}
                        </div>
                        </section>
    
                    </Fragment>
                ) : (
                    <>
                    <header >
                        <div className="app-bar">
                        </div>
                    </header>
                    <div>
                      <RegisterForm/>
                      <LoginForm/>
                  </div>
                    </>
                )}
                <main>
                  <div className="app-header"></div>
                 
                </main>
    
        </div>
      )
};