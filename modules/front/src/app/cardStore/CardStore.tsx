import  React from "react";
import { PrevCard } from "../card/PrevCard";




const test: Array<PreviewCard> = [
  {
      title: "Short test title", 
      author: "Wauxt", 
      date: "jan 17, 2020", 
      avatarSrc: "https://steamuserimages-a.akamaihd.net/ugc/872998386575050985/84BC2665965A3FF9F2E478C10A000B8DCFED22C6/"
  },
  {
      title: "Title that contains a little bit more words, nothing special.", 
      author: "Riley Spencer", 
      date: "mar 21, 2020", 
      avatarSrc: "https://cdn130.picsart.com/308821051047201.jpg?type=webp&to=crop&r=256"
  },
  {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
      author: "Jeremy Kelly", 
      date: "mar 30, 2020", 
      avatarSrc: "https://s3.amazonaws.com/media.muckrack.com/profile/images/99294/jeremy-kelly.jpeg.256x256_q100_crop-smart.jpg"
  }
];
  
interface myNewObject{
  _entityName: string;
  _instanceName: string;
  id: string;
}

class PrevCardStore extends React.Component<{}, { cards: Array<myNewObject> }>{  
  
  constructor(props:Array<myNewObject>) {
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
    var somebs: Array<myNewObject> = this.state.cards;
    var anotherbs: Array<PreviewCard> = new Array<PreviewCard>();
    var existingcards = <div></div>;    
    if(somebs.length != 0)
    {
      somebs.forEach(function (a) {
          anotherbs.push(
            {
              title: a.id,
              author: a.id,
              date: a.id,
              avatarSrc: "https://steamuserimages-a.akamaihd.net/ugc/872998386575050985/84BC2665965A3FF9F2E478C10A000B8DCFED22C6/"
            })
        } 
      );      
    }

    return (
      <div>
        <React.Fragment>           
          {anotherbs.map (a => (<PrevCard card ={a} />) )}
          <PrevCard card ={test[0]} />    
          <PrevCard card ={test[1]} />
          <PrevCard card ={test[2]} />            
        </React.Fragment>
        <br />
        <br />
      </div>
    );
  }
}

export default PrevCardStore;