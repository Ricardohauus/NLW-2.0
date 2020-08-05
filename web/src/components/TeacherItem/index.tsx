import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars2.githubusercontent.com/u/20543482?s=400&u=51e2d4f63d512c70a2fdcea1bede94979d2e1aae&v=4" alt="Foto Perfil" />
        <div>
          <strong>Ricardo Brasil</strong>
          <span>Fisica</span>
        </div>
      </header>
      <p>
        Entusiasta das melhores tecnologias de fisica avançada
            <br />
        <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
      <footer>
        <p>Preço/Hora
            <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="whatsapp" />
              Entrar em contato
            </button>
      </footer>

    </article>
  )

}

export default TeacherItem;