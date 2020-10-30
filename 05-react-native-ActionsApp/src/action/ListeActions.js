import React from 'react'
import {View, Text, FlatList} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, fnTerminer, fnSupprimer}) => {
    
    const renderItem = ({ item, index }) => (
        <UneAction action={item} fnTerminer={() => fnTerminer(index)} fnSupprimer={() => fnSupprimer(index)}/>
    );
    
    return (
        <FlatList
            data={actions}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item, index)}
        />
    );
}

export default ListeActions