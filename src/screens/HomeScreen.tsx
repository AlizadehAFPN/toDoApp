import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';
import {addTask, deleteTask, editTask} from '../redux/reducer/taskSlice';
import {changeBiometric} from '../redux/reducer/biometric';
import Modal from 'react-native-modal';
import InputItem from '../components/InputItem';
import ListItem from '../components/listItem';
import {startActivityAsync, ActivityAction} from 'expo-intent-launcher';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const rxState = useSelector((toDoList: any) => toDoList);
  const [state, setState] = React.useState({
    taskTitle: '',
    editTitle: '',
    editId: null,
    isBiometricSupported: false,
    modalVisible: false,
  });

  React.useEffect(() => {
    // just to check if the device support biometric or not. I don't want to filter old device;
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setState(s => ({...s, isBiometricSupported: compatible}));
    })();
  }, []);
  console.log(state.isBiometricSupported, '----');
  const onAddPressed = async () => {
    // check if the title is not empty when adding
    if (state.taskTitle.length == 0) {
      Alert.alert('No title!', 'Please enter a title for your new task');
      return;
    }

    // ask for login or check if logged in before
    let biomet = await handleBiometric();
    if (biomet) {
      dispatch(
        addTask({
          id: new Date().valueOf(),
          name: state.taskTitle,
        }),
      );
      setState(s => ({...s, taskTitle: ''}));
    }
  };

  const onEditPressed = async () => {
    // check if the title is not empty
    if (state.editTitle.length == 0) {
      Alert.alert('No title!', 'Please enter a title for your edited task');
      return;
    }
    // ask for login or check if logged in before
    let biomet = await handleBiometric();

    if (biomet) {
      dispatch(
        editTask({
          id: state.editId,
          name: state.editTitle,
          editedtime: new Date().valueOf(),
        }),
      );
      setState(s => ({...s, modalVisible: false}));
    }
  };

  const onDeleteTask = async (item: any) => {
    // delete task from list by dispatching and updating redux store
    let biomet = await handleBiometric();
    if (biomet) dispatch(deleteTask(item));
  };

  const handleBiometric = async () => {
    // If the user logged in before or his/her device are not supporting biometrics , we let him procceed
    if (rxState?.biometric?.value || state.isBiometricSupported == false)
      return true;

    // Ask for Login with biometric
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });
      //@ts-ignore
      if (biometricAuth?.error == 'not_available') {
        Alert.alert(
          'Attention!',
          'you haven not set a biometric yet, do you want to add it?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                if (Platform.OS == 'android')
                  startActivityAsync(ActivityAction.SECURITY_SETTINGS);
                else {
                  Linking.openURL('app-settings:');
                }
              },
            },
          ],
        );
      }
      // I just wanted the app work on simulator
      //@ts-ignore
      if (biometricAuth?.error == 'not_enrolled') {
        Alert.alert(
          'Warning!',
          'you are not using a secure device, Anyway, you can use our app :)',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                bioSuccedd();
              },
            },
          ],
        );
      }
      //success login
      if (biometricAuth.success) {
        bioSuccedd();
        return true;
      }
    } catch (error) {
      console.log(error, '++++');
    }
  };

  const bioSuccedd = () => {
    // update redux for next steps
    dispatch(changeBiometric(true));
  };

  const onModalPressed = (item: any) => {
    // open modal with selected value
    setState(s => ({
      ...s,
      modalVisible: true,
      editTitle: item?.name,
      editId: item?.id,
    }));
  };

  const closeModal = () => {
    // just close modal
    setState(s => ({...s, modalVisible: false}));
  };

  const onChangeText = (taskTitle: string) => {
    setState(s => ({...s, taskTitle}));
  };

  const keyExtractor = React.useCallback(
    (item: any, index: number) => item._id || `${index}`,
    [],
  );

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <InputItem
        btnName={'Add'}
        value={state.taskTitle}
        onChangeText={onChangeText}
        onBTNPressed={onAddPressed}
        placeHolder={'Add new task'}
      />

      <FlatList
        data={rxState?.tasks}
        style={{width: '100%', alignSelf: 'center'}}
        contentContainerStyle={{width: '100%', alignSelf: 'center'}}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => (
          <ListItem
            index={index}
            length={rxState?.tasks.length}
            item={item}
            onModalPressed={onModalPressed}
            onDeleteTask={onDeleteTask}
          />
        )}
      />
      <Modal
        isVisible={state.modalVisible}
        backdropOpacity={0.5}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}>
        <View style={{backgroundColor: 'white', borderRadius: 8}}>
          <Text style={{fontSize: 16, color: '#67BFBB', padding: 16}}>
            Edit Task :
          </Text>
          <InputItem
            value={state.editTitle}
            onChangeText={(name: string) =>
              setState(s => ({...s, editTitle: name}))
            }
            onBTNPressed={onEditPressed}
            placeHolder={'Edit task name'}
            btnName={'Edit'}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  start: {},
  button: {},
});
