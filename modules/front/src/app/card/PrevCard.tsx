import  React from "react";
import "./PrevCard.css";



interface PrevCardProps{
    card: PreviewCard;
}

export const PrevCard: React.FC<PrevCardProps> = ({card}) => {
    return (
    <li>
        <label>
            <input type="checkbox" checked = {card.complete}/>
            {card.title}
        </label>
    </li>
    )
}

