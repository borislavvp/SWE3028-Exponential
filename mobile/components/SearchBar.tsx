import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { View,Text } from "./Themed";
import {  StyleSheet } from 'react-native';

export default function Searchbar({ value, updateSearch, style }: {value:string,updateSearch:(text:string) => void, style?:any}) {

    const [search, setQuery] = useState(value);
    const [error, setError] = useState<string>()
    return (
         <View style={[styles.container, style]}>
            <View style={styles.searchContainer}>
                <View style={styles.vwSearch}>
                    <MaterialIcons name="search" size={20}/>
                </View>

                <TextInput
                    value={search}
                    placeholder="Search"
                    style={styles.textInput}
                    onChangeText={(text:string) => {
                        if (text !== ""){
                            setQuery(text)
                            updateSearch(text)
                        }
                        else setError("Please only enter alphabets")
                    }}
                />
                {
                    search ?
                        <TouchableOpacity
                            onPress={() => setQuery('')}
                            style={styles.vwClear}>
                            <MaterialIcons name="clear" size={20} />
                        </TouchableOpacity>
                        : <View style={styles.vwClear} />
                }

            </View>
            {
                error &&
                <Text style={styles.txtError}>
                    {error}
                </Text>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    txtError: {
        marginTop: '2%',
        width: '89%',
        color: 'white',

    },
    vwClear: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },

    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:10
        // width: 40,
        // backgroundColor: 'red'
    },
    icSearch: {
        height: 18, width: 18
    },
    searchContainer:
    {
        width: '100%',
        height: 40,
        flexDirection: 'row'

    },
    container: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth:1,
        width: "90%",
        margin:10,
        alignItems: 'center',
        // height: '100%', width: '100%' 
    },
});