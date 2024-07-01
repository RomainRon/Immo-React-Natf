import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
  const [prix, setPrix] = useState<number | undefined>(undefined);

  function createAnnonce () {
    console.log({
      titre: titre,
      caracteristique: caracteristique,
      prix: prix
    })
    fetch("http://127.0.0.1:3000/post", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        titre: titre,
        caracteristique: caracteristique,
        prix: prix
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setAnnonces(data))
      .catch((error) => setError(error.message));
  };

  const submit = () => {
    createAnnonce();
    setTitre("");
    setCaracteristique("");
    setPrix(undefined);
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
          value={prix ? prix.toString() : ''}
          onChangeText={(text) => setPrix(parseFloat(text))}
          placeholder="Prix"
          keyboardType="numeric"
        />
      </View>
      <Button
        title='Créer une nouvelle annonce'
        onPress={submit}
      />
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
    marginTop: 11,
    backgroundColor: 'white',
    height: 25,
    width: 61,
    borderRadius: 5,
  },
  btnText: {
    marginLeft: 3,
    fontSize: 18,
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
  },
});

export default AnnonceForm;
