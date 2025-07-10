import ArrowAbility from "../assets/image/abilities/arrow-next-ability.svg";
import ArrowAbilityDark from "../assets/image/abilities/arrow-next-ability-dark.svg";
import Game from "../assets/image/abilities/game.png";
import Mokup from "../assets/image/abilities/mokup.png";


export const abilityData = {
  header: {
    title: "Что я могу?",
    text: "Вот некоторые мои возможности, которые я хочу Вам продемонстрировать",
    image: ArrowAbility,
    imageDark: ArrowAbilityDark,
  },
  demo: [
    {
      id: 1,
      title: "Примерь свой лого!",
      text: "Онлайн-mokup, где ты сможешь увидеть как будет выглядеть твоё изображение на разных носителях",
      link: "/mokup",
      image: Game,
    },
    {
      id: 2,
      title: "Сможешь собрать?",
      text: "Увлекательный онлайн-пазл с предсказаниями. Собери его и узнай, что тебя ждет!",
      link: "/game",
      image: Mokup,
    }
  ]
}