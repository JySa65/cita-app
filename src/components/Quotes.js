import * as React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

const Quotes = ({quote, setCitas, citas}) => {
  const {setItem} = useAsyncStorage('@quotes');
  const handlerOnPress = async (id) => {
    const quotes = citas.filter((item) => item.id !== id);
    await setCitas(quotes);
    await setItem(JSON.stringify(quotes));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Paciente:</Text>
        <Text style={styles.titleText}>{quote.patient}</Text>
      </View>
      <View>
        <Text style={styles.title}>Propietario:</Text>
        <Text style={styles.titleText}>{quote.owner}</Text>
      </View>
      <View>
        <Text style={styles.title}>Sintomas:</Text>
        <Text style={styles.titleText}>{quote.symptom}</Text>
      </View>
      <View>
        <TouchableHighlight
          style={styles.btnDelete}
          onPress={() => handlerOnPress(quote.id)}>
          <Text style={styles.btnDeleteText}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  titleText: {
    fontSize: 18,
  },
  btnDelete: {
    padding: 10,
    backgroundColor: '#e83c59',
    marginVertical: 10,
  },
  btnDeleteText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Quotes;
