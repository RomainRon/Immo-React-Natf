import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";


interface Annonce {
    _id: string;
    titre: string;
    prix: number;
    caracteristique: string;
}

const Annonce = () => {
    const [annonces, setAnnonces] = useState<Annonce[]>([]);
    const [error, setError] = useState<string | null>(null);
    const handlePress = () =>{

    }

    useEffect(() => {
        fetch("http://127.0.0.1:3000/get/{{id}}")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setAnnonces(data))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                annonces.map((annonce) => (
                    <View key={annonce._id} style={styles.card}>
                        <View style={styles.container}>
                        <Text style={styles.title}>{annonce.titre}</Text>
                        <Text style={styles.price}>{annonce.prix} €</Text>
                        <Text style={styles.caracteristique}>{annonce.caracteristique}</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => handlePress()}>
                        <Text style={styles.btnText}>Détails</Text>
                      </TouchableOpacity>
                      </View>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'flex-start',
    },
    card: {
        backgroundColor: '#ff0000',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        width: '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    caracteristique: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    btn: {
        marginTop:11,
        backgroundColor:'white',
        height: 25,
        width: 61,
        borderRadius: 5,
      },
      btnText: {
        marginLeft:3,
        fontSize: 18,
        color: 'black',
      },
});

export default Annonce;
