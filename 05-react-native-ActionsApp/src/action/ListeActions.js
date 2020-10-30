import React from 'react'
import {View, Text, FlatList} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, fnTerminer, fnSupprimer, filtre}) => {

    const renderItem = ({ item, index }) => {
        if (filtre == 'toutes') {
            return <UneAction action={item} fnTerminer={() => fnTerminer(index)} fnSupprimer={() => fnSupprimer(index)}/>;
        } else if (filtre == 'actives' && !item.isTerminated) {
            return <UneAction action={item} fnTerminer={() => fnTerminer(index)} fnSupprimer={() => fnSupprimer(index)}/>;
        } else if (filtre == 'terminees' && item.isTerminated) {
            return <UneAction action={item} fnTerminer={() => fnTerminer(index)} fnSupprimer={() => fnSupprimer(index)}/>;
        }
        
    };
    
    return (
        <FlatList
            data={actions}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item, index)}
        />
    );
}

export default ListeActions