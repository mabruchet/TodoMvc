import React, { Component } from 'react';
import './App.css';
import Generator from '../Generator/Generator';


class App extends Component {

  constructor(props) {
      super(props)

      this.state = {
        passwordsList: [],
      }
  }

  /**
      * En onClick sur le btn-add du Generator : ajoute à la liste le mdp
      * mais ne permet pas de posséder le même dans la liste : no doublon.
   */
  addPassword = (password:string) => {
    if((this.state.passwordsList.map((list) => list.p)).indexOf(password) !== -1){
      alert("password already exist")
    }
    else{
      var Listepasswords = this.state.passwordsList.slice();
      Listepasswords.push(
        {p: password,
        isEdit: false});
      this.setState({passwordsList:Listepasswords})
    }
  }

/****
* *  Composant : Editor ?
****/

  /**
      * En onClick sur le btn-delete : supprime de la liste le bon mdp.
   */
  deletePassword = (event) => {

    var listePasswords = this.state.passwordsList.slice();
    var i = event.target.value;

    if(i>-1){
      listePasswords.splice(i,1); // splice ne fontionne qu'avec l'index.
    }

    this.setState({
      passwordsList: listePasswords
    })

  }


  /**
     *  en onClick sur le btn-edit : Changer le btn-edit en btn-save
     *  et permettre à l'utilisateur d'écrire dans la zone de texte.
     *  puis une fois btn-save onClick sauvegarde et mettre a jour list.
  */
  editPassword = (event) => {
    let index = this.state.passwordsList.map(list => list.p).indexOf(event.target.value);
    var Listepasswords = this.state.passwordsList.slice();
    console.log(event.target.value)

    Listepasswords[index].isEdit = true;

    this.setState({
      passwordsList : Listepasswords
    })
  }

  savePassword = (event) => {
    let index = this.state.passwordsList.map(list => list.p).indexOf(event.target.value);
    var Listepasswords = this.state.passwordsList.slice();
    let password = this.state.passwordsList[index];

    Listepasswords[index].isEdit = false;
    Listepasswords[index].p = document.getElementById(password.p).value;

    this.setState({
      passwordsList : Listepasswords
    })
  }

  renderList() {
    return <div>
      {this.state.passwordsList.map((list,i) =>
      <div className={list.p} key={i}>
        <input type="text" id={list.p} defaultValue={list.p} onClick={this.inputClick} disabled={!list.isEdit}/>
        <button
          type="button"
          className="btn-edit"
          value={list.p}
          onClick={this.editPassword}
          hidden={list.isEdit}>EDIT</button>
        <button
          type="submit"
          className="btn-save"
          value={list.p}
          onClick={this.savePassword}
          hidden={!list.isEdit}>SAVE</button>
        <button
          type="button"
          className="btn-delete"
          value={i}
          onClick={this.deletePassword}>
          DELETE
        </button>
      </div>
      )}
    </div>

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Password Generator</h1>
          <Generator addPassword={this.addPassword}/>
        </header>
        Votre liste ici.
        {this.renderList()}
      </div>

    );
  }
}

export default App;
