import * as React from "react";
import "./App.css";

import { Icon, Layout, Menu, Card } from "antd";
import { observer } from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import { NavLink, Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import { menuItems } from "../routing";
import {
  injectMainStore,
  MainStoreInjected,
  RouteItem,
  SubMenu
} from "@cuba-platform/react";
import { CenteredLoader } from "./CenteredLoader";
import {
  FormattedMessage,
  injectIntl,
  IntlFormatters,
  WrappedComponentProps
} from "react-intl";
import { PrevCard } from "./card/PrevCard";


@injectMainStore
@observer
class AppComponent extends React.Component<
  MainStoreInjected & WrappedComponentProps
> {
  render() {
    const mainStore = this.props.mainStore!;
    const { initialized, locale, loginRequired } = mainStore;

    if (!initialized || !locale) {
      return <CenteredLoader />;
    }
    if (loginRequired) {
      return (
        <Centered>
          <Login />
        </Centered>
      );
    }
    const menuIdx = 1;    
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

    return (
      <Layout className="main-layout">
        <Layout.Header style={{background:"#323232"}}>
          <AppHeader />
        </Layout.Header>
        <Layout>
          <Layout.Sider
            width={200}
            breakpoint="sm"
            collapsedWidth={0}
            style={{ background: "#fff" }}
          >
            <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
              <Menu.Item key={menuIdx}>
                <NavLink to={"/"}>
                  <Icon type="home" />
                  <FormattedMessage id="router.home" />
                </NavLink>
              </Menu.Item>
              {menuItems.map((item, idx) =>
                menuItem(item, "" + (idx + 1 + menuIdx), this.props.intl)
              )}
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: "16px 16px 16px", background: "#f2f2f2"}}>
            <Layout.Content >

              <React.Fragment>
                <PrevCard card ={test[0]} />    
                <PrevCard card ={test[1]} />
                <PrevCard card ={test[2]} />            
              </React.Fragment>

              <br />
              <br />

              <Switch>
                <Route exact={true} path="/" component={HomePage} />
                {collectRouteItems(menuItems).map(route => (
                  <Route
                    key={route.pathPattern}
                    path={route.pathPattern}
                    component={route.component}
                  />
                ))}
              </Switch>
              
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

function menuItem(
  item: RouteItem | SubMenu,
  keyString: string,
  intl: IntlFormatters
) {
  // Sub Menu

  if ((item as any).items != null) {
    //recursively walk through sub menus
    return (
      <Menu.SubMenu
        key={keyString}
        title={intl.formatMessage({
          id: "router." + item.caption
        })}
      >
        {(item as SubMenu).items.map((ri, index) =>
          menuItem(ri, keyString + "-" + (index + 1), intl)
        )}
      </Menu.SubMenu>
    );
  }

  // Route Item

  const { menuLink } = item as RouteItem;

  return (
    <Menu.Item key={keyString}>
      <NavLink to={menuLink}>
        <Icon type="bars" />
        <FormattedMessage id={"router." + item.caption} />
      </NavLink>
    </Menu.Item>
  );
}

function collectRouteItems(items: Array<RouteItem | SubMenu>): RouteItem[] {
  return items.reduce(
    (acc, curr) => {
      if ((curr as SubMenu).items == null) {
        // Route item
        acc.push(curr as RouteItem);
      } else {
        // Items from sub menu
        acc.push(...collectRouteItems((curr as SubMenu).items));
      }
      return acc;
    },
    [] as Array<RouteItem>
  );
}

const App = injectIntl(AppComponent);
export default App;
