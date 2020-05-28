import { Button, Modal } from "antd";
import * as React from "react";
import { observer } from "mobx-react";
import "./AppHeader.css";
import logo from "./logo.png";
import { injectMainStore, MainStoreInjected } from "@cuba-platform/react";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { injectIntl, WrappedComponentProps } from "react-intl";

@injectMainStore
@observer
class AppHeader extends React.Component<
  MainStoreInjected & WrappedComponentProps
> {
  render() {
    const appState = this.props.mainStore!;

    return (
      <div className="app-header">
        <div>
          <img
            className="size-correction"          
            src={logo}
            alt={this.props.intl.formatMessage({ id: "common.alt.logo" })}
          />
        </div>
        <div className="user-panel">
          <LanguageSwitcher className="panelelement language-switcher -header" />
          <span className="panelelement">
          {(appState.loginRequired) ? "Anonymous" : appState.userName}
          </span>
          <Button
            className="panelelement"
            ghost={true}
            icon="logout"
            style={{ border: 0 }}
            onClick={(appState.loginRequired)? this.showLoginConfirm : this.showLogoutConfirm}
          />
        </div>
      </div>
    );
  }

  showLogoutConfirm = () => {
    Modal.confirm({
      title: this.props.intl.formatMessage({ id: "header.logout.areYouSure" }),
      okText: this.props.intl.formatMessage({ id: "header.logout.ok" }),           //модаль подтверждения выхода
      cancelText: this.props.intl.formatMessage({ id: "header.logout.cancel" }),
      onOk: () => {
        this.props.mainStore!.logout();
      }
    });
  };

 showLoginConfirm = () => {
    Modal.confirm({
      title: 'Желаете пройти авторизацию?',
      okText: this.props.intl.formatMessage({ id: "login.loginBtn"}),
      cancelText: this.props.intl.formatMessage({ id: "header.logout.cancel" }),   //модаль подтверждения авторизации
      onOk: () => {
        this.props.mainStore!.logout();
      }
    });
  };
}

export default injectIntl(AppHeader);
