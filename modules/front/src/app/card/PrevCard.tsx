import  React, {useState, useEffect} from "react";
import "./PrevCard.css";



interface PrevCardProps{
    card: PreviewCard;
}


export const PrevCard: React.FC<PrevCardProps> = ({card}) => {
    const [expanded, setexpanded] = useState(false)
    function getexpanded(){
        return expanded
    }
    return (
        
    <div className = "mainDiv">                
        <div className = "cardTitle">
            <a style={{color: "#202020"}} onClick={() => setexpanded(!getexpanded())}><b>{card.title}</b></a>
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
        {getexpanded() && <div className = "cardContent" dangerouslySetInnerHTML={{__html: '<hr style="margin-left:-20px; margin-right:-20px; border-top: 2px solid rgb(200,200,200)"><div style="height:10px;"></div>'+ card.content}}></div>}        
    </div>
    )
}

