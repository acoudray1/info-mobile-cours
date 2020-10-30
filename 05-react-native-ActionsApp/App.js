import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [
            {
                'titre': 'demo action',
                'isTerminated': false,
            }
        ]
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        this.state.texteSaisie = nouvelleSaisie;
        console.log('la saisie à changée', nouvelleSaisie)
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        this.setState(this.state.actions, () => {
            this.state.actions.push({
                'titre': this.state.texteSaisie,
                'isTerminated': false
            });
        });
        console.log('Vous avez cliqué sur Valider !')
    }

    /**
     * Supprimer action
     */
    supprimerAction(index) {
        this.setState(this.state.actions, () => {
            this.state.actions.splice(index, 1);
        });
    }

    /**
     * Passer l'action à supprimer
     */
    termineAction(index) {
        this.setState(this.state.actions, () => {
            this.state.actions[index].isTerminated = true;
        });
    }

    render() {
        const {texteSaisie, actions} = this.state

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions actions={actions}/>
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})