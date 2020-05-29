import  React from "react";
import { observer } from "mobx-react";
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

class PrevCardStore extends React.Component
{    
  render() {    
    
    return (
      <div>
        <React.Fragment>
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