import mobile from '../assets/image/contactsImage/mobile.svg'
import name from '../assets/image/contactsImage/name.svg'
import post from '../assets/image/contactsImage/post.svg'


export const contactsForm = [
  {
    index: 1,
    id: 'name',
    icon: name,
    placeholder: 'Фамилия, имя (Обязательно)',
    type: 'text'
  },
  {
    index: 2,
    id: 'email',
    icon: post,
    placeholder: 'Электронная почта (Обязательно)',
    type: 'email'
  },
  {
    index: 3,
    id: 'tel',
    icon: mobile,
    placeholder: 'Номер телефона (Обязательно)',
    type: 'tel'
  }
]