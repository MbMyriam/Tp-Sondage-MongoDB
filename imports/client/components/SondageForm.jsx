import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';



export const SondageForm = () => {
    const [nom, setNom] = useState('');
  const [question, setQuestion] = useState({});
  const [reponses, setReponses] = useState('');
  const [type, setType] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault(); //pour empêcher la page de refresh

    //appelle de la méthode d'insertion dans la collection sondage si les paramètres sont respectés
    Meteor.call('insertNewSondage', nom, question, type, reponses, (err) => {
        if (!err) {
            //pour reset les valeurs s'il n'y a pas d'erreur, sinon la valeur reste pour indiquer à l'user l'erreur
            console.log('Sondage ajouté.')
        } else {
            console.log("error")
            return "erreur"
        }
    });
}


  const handleClick = e => {

    console.log("User id : " + Meteor.userId())
  }


  return (
    <div>     
      <form onSubmit={handleSubmit} className="login-form">

      <label htmlFor="question">Nom : </label>

        <input
        type="text"
        placeholder="Nom"
        name="nom"
        required
        onChange={e => setNom(e.target.value)}
        />

        <select defaultValue={'default'} onChange={e => setType(e.target.value)} >
            <option value="default" disabled hidden>Choisir le type</option>
            <option value="ouvert">Ouvert</option>
            <option value="qcm">Qcm</option>
        </select>

        <label htmlFor="question">Question : </label>

        <input
          type="text"
          placeholder="Question"
          name="question"
          required
          onChange={e => setQuestion(e.target.value)}
        />

        <label htmlFor="reponses">Réponses</label>

        <input
          type="reponses"
          placeholder="Réponses"
          name="reponses"
          required
          onChange={e => setReponses(e.target.value)}
        />

        <button type="submit" onClick={handleClick} >Ok</button>

      </form>
    </div>
  );
};