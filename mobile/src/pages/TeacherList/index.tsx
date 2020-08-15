import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsynctStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {

  const [isFiltersVisible, setIsFilterVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('Matematica');
  const [week_day, setWeekDay] = useState('1');
  const [time, setTime] = useState('8:00');

  function loadFavorites() {
    AsynctStorage.getItem('favorites').then(res => {
      if (res) {
        const favoritedTeachers = JSON.parse(res);
        const favoritedTeachersIds = favoritedTeachers.map((t: Teacher) => {
          return t.id
        })
        setFavorites(favoritedTeachersIds);
      }
    })
  }
  function handleToggleFiltersVisible() {
    setIsFilterVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    const res = await api.get('classes', {
      params: { subject, week_day, time }
    })
    setIsFilterVisible(false);
    setTeachers(res.data);
  }

  useFocusEffect(() => {
    loadFavorites();
  })

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" headerRight={
        (<BorderlessButton onPress={handleToggleFiltersVisible} >
          <Feather name="filter" size={20} color="#FFF" />
        </BorderlessButton>)
      }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o Dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual o horario?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit} >
              <Text style={styles.submitButtonText}> Filtrar </Text>
            </RectButton>

          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}

            />)
        })}


      </ScrollView>
    </View>
  );
}

export default TeacherList;