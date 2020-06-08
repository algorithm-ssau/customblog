import  React from "react";
import { PrevCard } from "../card/PrevCard";
import { User } from "../../cuba/entities/base/sec$User";





const test: Array<PreviewCard> = [
  {
      title: "Short test title", 
      author: "Wauxt", 
      date: "jan 17, 2020", 
      avatarSrc: "https://steamuserimages-a.akamaihd.net/ugc/872998386575050985/84BC2665965A3FF9F2E478C10A000B8DCFED22C6/",
      content: '<body><img src="https://img.tvsamara.ru/i/59/59b2f9cb129c1501994d76773221eef9.jpg" alt="О ситуации с коронавирусом в Самарской области на 8 июня"><div><br></div><div><p style="box-sizing: border-box; margin: 0px 0px 1.25em; padding: 0px; font-size: 16.8px; line-height: 2; text-rendering: optimizelegibility; color: rgb(34, 34, 34); font-family: Arial, sans-serif; background-color: rgb(255, 255, 255);">По данным оперативного штаба в Самарской области известно о 88 новых случаях коронавируса в Самарской области.</p><p style="box-sizing: border-box; margin: 0px 0px 1.25em; padding: 0px; font-size: 16.8px; line-height: 2; text-rendering: optimizelegibility; color: rgb(34, 34, 34); font-family: Arial, sans-serif; background-color: rgb(255, 255, 255);">Общее число заболевших жителей региона за все время пандемии составляет 3114 человек. Выздоровели 1425 человек, 24 только за прошедшие сутки.</p><p style="box-sizing: border-box; margin: 0px 0px 1.25em; padding: 0px; font-size: 16.8px; line-height: 2; text-rendering: optimizelegibility; color: rgb(34, 34, 34); font-family: Arial, sans-serif; background-color: rgb(255, 255, 255);">2 женщины с подтвержденным диагнозом COVID-19 скончались в минувшие сутки. Таким образом, всего на территории Самарской области от коронавируса умерло 27 человек.</p><p style="box-sizing: border-box; margin: 0px 0px 1.25em; padding: 0px; font-size: 16.8px; line-height: 2; text-rendering: optimizelegibility; color: rgb(34, 34, 34); font-family: Arial, sans-serif; background-color: rgb(255, 255, 255);">Режим ограничительных мер в Самарской области действует по 8 июня включительно. Это регламентирует последние постановление губернатора. Дальнейшие меры по борьбе с распространением новой коронавирусной инфекции определятся на заседании регионального оперативного штаба, с учетом всех рекомендаций главного санитарного врача Самарской области.</p><p style="box-sizing: border-box; margin: 0px 0px 1.25em; padding: 0px; font-size: 16.8px; line-height: 2; text-rendering: optimizelegibility; color: rgb(34, 34, 34); font-family: Arial, sans-serif; background-color: rgb(255, 255, 255);">Эпидемиологическая обстановка в городах и районах региона разная. Где-то, как например в Сызрани и Тольятти, действуют более жесткие карантинные меры. В Самаре, Новокуйбышевске, Кинеле и других муниципалитетах работают магазины, в режиме "предзаказа" и "на вынос"&nbsp;<a href="http://tvsamara.ru/news/v-samare-nachali-otkryvatsya-fud-korty/" style="box-sizing: border-box; margin: 0px; padding: 0px; background-color: transparent; line-height: inherit; color: rgb(0, 56, 185); text-decoration-line: none; cursor: pointer; transition: all 0.25s ease 0s; border-bottom: 1px solid rgb(0, 56, 185);">начали обслуживать клиентов фуд-корты</a>&nbsp;в торговых центрах, функционируют предприятия, открыты парки и скверы,&nbsp;<a href="http://tvsamara.ru/news/strashno-no-mogilu-nado-posetit-kak-samarcy-otmetili-roditelskuyu-subbotu/" style="box-sizing: border-box; margin: 0px; padding: 0px; background-color: transparent; line-height: inherit; color: rgb(0, 56, 185); text-decoration-line: none; cursor: pointer; transition: all 0.25s ease 0s; border-bottom: 1px solid rgb(0, 56, 185);">можно посещать кладбища</a>.</p></div></body>'
  },
  {
      title: "Title that contains a little bit more words, nothing special.", 
      author: "Riley Spencer", 
      date: "mar 21, 2020", 
      avatarSrc: "https://cdn130.picsart.com/308821051047201.jpg?type=webp&to=crop&r=256",
      content: "awefawefsf"
  },
  {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
      author: "Jeremy Kelly", 
      date: "mar 30, 2020", 
      avatarSrc: "https://s3.amazonaws.com/media.muckrack.com/profile/images/99294/jeremy-kelly.jpeg.256x256_q100_crop-smart.jpg",
      content: "awefawefsf"
  }
];
  
interface PublicationJSON{
  _entityName: string;
  _instanceName: string;
  id: string;
  releaseDate: string;
  author: AuthorJSON;
  rates: Array<{}>;
  rating: number;
  title: string;
  version: number;
  content: string;  
  tags: Array<{}>;
  category: CategoryJSON;  
}
interface AuthorJSON{
  _entityName: string;
  _instanceName: string;
  id: string;
  about: string;
  active: boolean;
  version: number;  
  visibleName: string;
  banned: boolean;
  user: UserJSON;
}
interface UserJSON{
  _entityName: string;
  _instanceName: string;
  id: string;
  login: string;  
  avatarUrl: string;
  version: number;
  name:string;
}
interface CategoryJSON{
  _entityName: string;
  _instanceName: string;
  id: string;
  version: number;
  name: string;
  description: string;
  active: boolean;  
}

class PrevCardStore extends React.Component<{}, { cards: Array<PublicationJSON> }>{  
  
  constructor(props:Array<PublicationJSON>) {
    super(props);
    this.state = {
        cards: []        
    }
  }
  componentDidMount() {
    fetch('../app/rest/v2/services/blog_PublicationsService/getCategoryNamePublications?categoryName=Main')
        .then(res => res.json())
        .then(result => this.setState({ cards: result }))
  }
  
  render() 
  {
    var somebs: Array<PublicationJSON> = this.state.cards;
    var anotherbs: Array<PreviewCard> = new Array<PreviewCard>();    
    if(somebs.length != 0)
    {
      somebs.forEach(function (a) {          
          anotherbs.push(
            {
              title: a.title,
              author: a.author.visibleName,
              date: new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              }).format(new Date(a.releaseDate)),
              avatarSrc: a.author.user.avatarUrl,
              content: a.content
            });
        } 
      );      
    }

    return (
      <div>
        <React.Fragment>           
          {anotherbs.map (a => (<PrevCard card ={a} />) )}                 
        </React.Fragment>
        <br />
        <br />
      </div>
    );
  }
}

export default PrevCardStore;