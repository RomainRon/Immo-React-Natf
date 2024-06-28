import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AnnonceForm = () => {
    interface Annonce {
        _id: string;
        titre: string;
        prix: number;
        caracteristique: string;
    }
    const [annonces, setAnnonces] = useState<Annonce[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [titre, setTitre] = useState('');
    const [caracteristique, setCaracteristique] = useState('');
    const [prix, setPrix] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:3000/post")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => setAnnonces(data))
        .catch((error) => setError(error.message));
}, []);
  const handleSubmit = () => {

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ajout des annonces</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Titre</Text>
        <TextInput
          style={styles.input}
          value={titre}
          onChangeText={setTitre}
          placeholder="Titre"
          
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Caractéristique</Text>
        <TextInput
          style={styles.input}
          value={caracteristique}
          onChangeText={setCaracteristique}
          placeholder="Caractéristique"
          
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Prix</Text>
        <TextInput
          style={styles.input}
          value={prix}
          onChangeText={setPrix}
          placeholder="Prix"
          keyboardType="numeric"
          
        />
      </View>
      <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Créer une annonces</Text>
              </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
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
    display:'flex',
    flexDirection:'row',
    textAlign: 'center',
  },
});

export default AnnonceForm;
