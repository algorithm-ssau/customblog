import  React from "react";
import "./PrevCard.css";



interface PrevCardProps{
    card: PreviewCard;
}

export const PrevCard: React.FC<PrevCardProps> = ({card}) => {
    return (
    <div className = "mainDiv">        
        <div className = "cardTitle">
            <a style={{color: "#202020"}}><b>{card.title}</b></a>
        </div>
        
        <div className="cardRightSide">
            <div className="cardAuthorThing">
                <a style={{color: "black"}}>{card.author}</a>
                <br />
                <div className="cardDate">
                    {card.date} 
                </div>            
            </div>    
            <img className="cardAvatar" src={card.avatarSrc} />           
        </div>        
    </div>
    )
}

