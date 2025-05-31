import mobile from '../assets/image/contactsImage/mobile.svg'
import name from '../assets/image/contactsImage/name.svg'
import post from '../assets/image/contactsImage/post.svg'


export const contactsForm = [
  {
    id: 1,
    icon: name,
    placeholder: 'Фамилия, имя',
    type: 'text'
  },
  {
    id: 2,
    icon: post,
    placeholder: 'Электронная почта',
    type: 'email'
  },
  {
    id: 3,
    icon: mobile,
    placeholder: 'Номер телефона',
    type: 'tel'
  }
]