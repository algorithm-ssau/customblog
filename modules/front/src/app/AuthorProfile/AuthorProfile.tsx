import * as React from "react";
import "./AuthorProfile.css";

export class AuthorProfile extends React.Component {
  render() {
   return (
  <div>

    <table>
      <td>
        <tr>
          <div className = "Nick">VisibleName(ник)<br/></div>
        </tr>
        <tr>
          <div className = "FullName">AuthorName(ФИО)</div>
        </tr>
        <tr>
          <div className = "About"><p>AuthorAbout</p></div>
        </tr>
      </td>
      <td>
        <table>
          <td>
            <tr>
              <img className="Avatar" src="https://wallpapers-fenix.eu/lar/141213/224735864.jpg"/>
            </tr>
            <tr>
             <div className = "offline">offline</div>
            </tr>
            <tr>
              <div className = "banned">banned</div>
             </tr>
          </td>
        </table>
      </td>
    </table>
  </div>
      )
   }
}





















