import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import dayjs from 'dayjs';
import 'dayjs/locale/es';

const {useState} = React;

const AddQuote = ({setCitas, setShowForm, citas}) => {
  const [data, setData] = useState({
    patient: '',
    owner: '',
    symptom: '',
    ownerContact: '',
    date: '',
    time: '',
  });

  const dataSpanish = {
    patient: 'Paciente',
    owner: 'Dueño',
    symptom: 'Sintomas',
    ownerContact: 'Telefono de Contacto',
    date: 'Fecha',
    time: 'Hora',
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const {setItem} = useAsyncStorage('@quotes');

  const handleOnChangeText = (name) => (text) => {
    setData((prev) => ({...prev, [name]: text}));
  };

  const handleDatePicker = () => setDatePickerVisibility((prev) => !prev);
  const handleHourPicker = () => setTimePickerVisibility((prev) => !prev);

  const handleConfirm = (name) => (date) => {
    if (name === 'date') {
      setData((prev) => ({
        ...prev,
        [name]: dayjs(date).locale('es').format('DD/MM/YY'),
      }));
      handleDatePicker();
    }
    if (name === 'time') {
      setData((prev) => ({
        ...prev,
        [name]: dayjs(date).locale('es').format('hh:mm a'),
      }));
      handleHourPicker();
    }
  };

  const handlerOnPress = async () => {
    try {
      Object.keys(data).forEach((item) => {
        if (data[item].trim() === '') {
          throw `${dataSpanish[item]} es requerido`;
        }
      });

      const quotes = [{...data, id: +new Date()}, ...citas];
      await setItem(JSON.stringify(quotes));
      await setCitas(quotes);
      Object.keys(data).forEach((item) => {
        setData((prev) => ({...prev, [item]: ''}));
      });
      setShowForm(false);
    } catch (e) {
      Alert.alert('Citas Error', e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Paciente:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Paciente"
          value={data.patient}
          onChangeText={handleOnChangeText('patient')}
        />
      </View>
      <View>
        <Text style={styles.title}>Dueño:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Dueño"
          value={data.owner}
          onChangeText={handleOnChangeText('owner')}
        />
      </View>
      <View>
        <Text style={styles.title}>Telefono de Contacto:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Telefono de Contacto"
          value={data.ownerContact}
          onChangeText={handleOnChangeText('ownerContact')}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text style={styles.title}>Fecha:</Text>
        <Pressable onPress={handleDatePicker}>
          <View pointerEvents="none">
            <TextInput
              style={styles.textInput}
              placeholder="Fecha"
              value={data.date}
            />
          </View>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm('date')}
          onCancel={handleDatePicker}
          locale="es-ve"
          headerTextIOS="Elige una fecha"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
        />
      </View>
      <View>
        <Text style={styles.title}>Hora:</Text>
        <Pressable onPress={handleHourPicker}>
          <View pointerEvents="none">
            <TextInput
              style={styles.textInput}
              placeholder="Hora"
              value={data.time}
            />
          </View>
        </Pressable>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm('time')}
          onCancel={handleHourPicker}
          locale="es-ve"
          headerTextIOS="Elige una hora"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
        />
      </View>
      <View>
        <Text style={styles.title}>Sintomas:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Sintomas"
          value={data.symptom}
          onChangeText={handleOnChangeText('symptom')}
          multiline
        />
      </View>
      <View>
        <TouchableHighlight style={styles.btnAdd} onPress={handlerOnPress}>
          <Text style={styles.btnAddText}>Añadir +</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
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
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  textInput: {
    marginTop: 10,
    height: 40,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnAdd: {
    padding: 10,
    backgroundColor: '#3e9bed',
    marginVertical: 20,
  },
  btnAddText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddQuote;
