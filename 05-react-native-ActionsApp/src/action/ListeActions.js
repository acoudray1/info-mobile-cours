import React from 'react'
import {View, Text, FlatList} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions}) => {
    
    const renderItem = ({ item }) => (
        <UneAction titre={item} />
    );
    
    return (
        <FlatList
            data={actions}
            renderItem={renderItem}
            keyExtractor={item => item}
        />
    );
}

export default ListeActions