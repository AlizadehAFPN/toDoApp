import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface itemType {
  onBTNPressed: (event: GestureResponderEvent) => void;
  onChangeText: Function;
  placeHolder: string;
  value: string;
  btnName: string;
}

const InputItem = ({
  onChangeText,
  onBTNPressed,
  placeHolder,
  value,
  btnName,
}: itemType) => {
  return (
    <View style={styles.mainView}>
      <TextInput
        testID='myinput'
        placeholderTextColor={'#5C5C5C'}
        value={value}
        onChangeText={txt => onChangeText(txt)}
        placeholder={value?.length != 0 ? '' : placeHolder}
        style={[styles.input, {paddingLeft: 16}]}
      />
      <TouchableOpacity onPress={onBTNPressed} style={styles.btn}>
        <Text style={styles.addTxt}>{btnName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputItem;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F4F4F4',
    borderRadius: 5,
    borderStyle: 'dashed',
    marginBottom: 5,
    width: '100%',
    padding: 16,
  },
  input: {
    width: '85%',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    height: 40,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 3,
    backgroundColor: '#67BFBB',
  },
  addTxt: {
    color: 'white',
  },
});
