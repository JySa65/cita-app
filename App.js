import * as React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';

import Quotes from './src/components/Quotes';
import AddQuote from './src/components/AddQuote';

const {useState} = React;

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [citas, setCitas] = useState([]);

  return (
    // <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Administrador de Citas</Text>
      <View>
        <View>
          <TouchableHighlight
            style={styles.btnAdd}
            onPress={() => setShowForm((prev) => !prev)}>
            <Text style={styles.btnAddText}>
              {!showForm ? 'Añadir Cita' : 'Cancelar'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.content}>
        {showForm && (
          <>
            <Text style={styles.subtitle}>Añade un Cita</Text>
            <AddQuote setCitas={setCitas} setShowForm={setShowForm} />
          </>
        )}

        {!showForm && (
          <>
            <Text style={styles.subtitle}>
              {citas.length >= 1
                ? 'Administra tus Citas'
                : 'No hay citas pendientes, agrega una :D'}
            </Text>

            <FlatList
              style={styles.flatList}
              data={citas}
              renderItem={({item}) => (
                <Quotes quote={item} setCitas={setCitas} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        )}
      </View>
    </SafeAreaView>
    // </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  content: {
    height: '83%',
    marginHorizontal: '2.5%',
  },
  flatList: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnAdd: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  btnAddText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
