import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({fnFiltrer}) => (
    <View style={styles.menu}>
        <OptionMenu nom="Toutes" onclick={() => fnFiltrer('toutes')}/>
        <OptionMenu nom="Actives" onclick={() => fnFiltrer('actives')}/>
        <OptionMenu nom="Terminées" onclick={() => fnFiltrer('terminees')}/>
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu