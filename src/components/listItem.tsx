import moment from 'moment';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface itemType {
  onDeleteTask: Function;
  onModalPressed: Function;
  item: {id:number , name:string , editedtime:number };
  length: number;
  index: number;
}

const ListItem = ({index, length, item, onModalPressed, onDeleteTask}: itemType) => {

  var time = moment(new Date(item?.id)).format('MMM-DD-YYYY hh:mm:ss');
  var editedtime = moment(new Date(item?.editedtime)).format('MMM-DD-YYYY hh:mm:ss');

// some small inLine styles, I really didn't want to make more lines for simple style
  return (
    <View
      style={[
        styles.mainItem,
        {
          borderTopRightRadius: index == 0 ? 8 : 0,
          borderTopLeftRadius: index == 0 ? 8 : 0,
          borderBottomLeftRadius: index == length - 1 ? 8 : 0,
          borderBottomRightRadius: index == length - 1 ? 8 : 0,
          borderTopWidth: index !== 0 ? 1 : 0,
        },
      ]}>
      <View  testID='viewItem' style={{width:'80%'}}>
        <Text style={{color:'black'}}>Name: {item?.name}</Text>
        <Text style={{marginTop: 8}}>Created: {time}</Text>
        <Text testID='editedtest' style={{marginTop: 8, color: '#67BFBB'}}>
          Last Update: {item?.editedtime ? editedtime : 'No Update Yet'}
        </Text>
      </View>

      <View style={styles.actionMenu}>
        <TouchableOpacity onPress={() => onModalPressed(item)}>
          <Icon style={{marginRight: 16}} name="edit" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDeleteTask(item)}>
          <Icon name="delete" size={20} color="#CC0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  mainItem: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderColor: '#CACACA',
  },
  actionMenu: {
    flexDirection: 'row', 
    height: '100%', 
    alignItems: 'center',
    justifyContent:'flex-end',
    width:'20%',
  },
});
