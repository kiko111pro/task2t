import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  SafeAreaView,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../features/auth/auth.reducer';
import {getData} from '../features/services.common';
import {
  languageChange,
  setLanguage,
} from '../features/language/language.reducer';
// import {SafeAreaView} from 'react-native-safe-area-context';

const AppShell = () => {
  const dispatch = useDispatch();
  const {language} = useSelector(state => state.language);

  const init = async () => {
    const lang = await getData('language');

    console.log({lang});
    lang ? dispatch(setLanguage(lang)) : dispatch(setLanguage('english'));
  };

  useEffect(() => {
    init();
  }, []);
  const [isEnglish, setEnglish] = useState('english');
  const toggleSwitch = () => {
    dispatch(
      languageChange({
        action: 'update_language',
        current_language: isEnglish ? 'english' : 'hindi',
      }),
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Text>English</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnglish ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnglish}
          />
          <Text>Hindi</Text>
        </View>
        <TouchableOpacity
          onPress={() => dispatch(logout())}
          style={{
            backgroundColor: '#0000ff',
            paddding: 26,
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 20, margin: 20}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppShell;

const styles = StyleSheet.create({});
