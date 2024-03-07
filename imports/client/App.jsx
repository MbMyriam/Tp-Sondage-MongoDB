import React, {useState, Fragment} from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { SondageForm } from './components/SondageForm';
import SondagesCollection from '../api/SondagesCollection';
import { Sondage } from './Sondage';

export const App = () => {
    let [hideCompleted, setHideCompleted] = useState(0);
    let [listSondage, setListSondage] = useState({});
    let [displaySondages, setDisplaySondages] = useState(false);

    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();
    const { sondage, ready } = useTracker(() => {
        const subscription = Meteor.subscribe('allSondagesCollection');
        return {
            sondage: SondagesCollection.find({}).fetch(),
            ready: subscription.ready()
        };
    });
    if (!ready) {
        return <div>loading</div>
    }
    if (user) {
        listSondage = SondagesCollection.find({ 'sondage.createur': user._id }).fetch();
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
                            <button onClick={() => setDisplaySondages(!displaySondages)}>Liste Sondage</button>
                        </div>
                        {displaySondages && <Sondage />}
                    </header>

                    <SondageForm/>

                </Fragment>
            ) : (
                <header >
                    <div className="app-bar">
                    </div>
                </header>
            )}
            <main>
              <div className="app-header"></div>
              <div>
                  <RegisterForm/>
                  <LoginForm/>
              </div>
            </main>

    </div>
  )

  
};
