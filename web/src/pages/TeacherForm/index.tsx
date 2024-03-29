import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css';
import api from '../../services/api';

function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');


  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems
    ]);
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const updateScheduleItems = scheduleItems.map((s, i) => {
      if (index === i) {
        return { ...s, [field]: value }
      }
      return s;
    })
    setScheduleItems(updateScheduleItems);
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    await api.post('classes', {
      name, avatar, whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch((e) => {
      alert('Erro: ' + e);
    })
    
  }
  
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input name="name" label="Nome Completo" value={name} onChange={(e) => { setName(e.target.value) }} />
            <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }} />
            <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }} />
            <TextArea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }} />

          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select name="subject" label="Matéria" value={subject} onChange={(e) => { setSubject(e.target.value) }}
              options={
                [
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ciências', label: 'Ciências' },
                  { value: 'Educação Fisica', label: 'Educação Fisica' },
                  { value: 'Fisica', label: 'Fisica' },
                  { value: 'Geografia', label: 'Geografia' },
                  { value: 'História', label: 'História' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Português', label: 'Português' },
                  { value: 'Química', label: 'Química' },
                ]
              }
            />
            <Input name="cost" label="Custo de sua hora por aula" value={cost} onChange={(e) => { setCost(e.target.value) }} />
          </fieldset>

          <fieldset>
            <legend>Horários Disponíveis
          <button type="button" onClick={addNewScheduleItem} > + Novo Horario</button>
            </legend>
            {
              scheduleItems.map((s, index) => {
                return (
                  <div key={s.week_day} className="schedule-item">
                    <Select name="week_day" label="Dia da Semana"
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                      value={s.week_day}
                      options={
                        [
                          { value: '0', label: 'Domingo' },
                          { value: '1', label: 'Segunda-feira' },
                          { value: '2', label: 'Terça-feira' },
                          { value: '3', label: 'Quarta-feira' },
                          { value: '4', label: 'Quinta-feira' },
                          { value: '5', label: 'Sexta-feira' },
                          { value: '6', label: 'Sábado' },
                        ]
                      }
                    />
                    <Input name="from" label="Das" type="time" value={s.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                    <Input name="to" label="Até" type="time" value={s.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                  </div>
                )
              })
            }
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados

          </p>

            <button type="submit">Salvar cadastro</button>

          </footer>
        </form>
      </main>


    </div>
  )
}

export default TeacherForm;