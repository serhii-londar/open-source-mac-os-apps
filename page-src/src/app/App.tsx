import React, { FC, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { FetchApplicationsAction, FetchApplicationsSucceedAction } from './actions/applications';
import { FetchCategoriesAction, FetchCategoriesFaildAction, FetchCategoriesSucceedAction } from './actions/categories';

import styles from './App.module.scss';

import Application from './components/Application/Application';
import CategoriesList from './components/CategoriesList/CategoriesList';
import Categoty from './components/Category/Category';
import Home from './components/Home/Home';
import { AppContext } from './contexts/AppContext';
import { applications, InitialApplicationsState } from './reducers/applications';
import { categories, Category, InitialCategoriesState } from './reducers/categories';
import { FetchCategories } from './services/Api';
import PathBuilder from './services/PathBuilder';

let rawCategories = require('../categories.json');
let rawApplications = require('../applications.json');

enum APP_ROUTES {
  HOME = '/',
  CATEGORY = '/:category',
  APPLICATION = '/:category/:application',
}

const App: FC = () => {
  // const [categoriesState, categoriesDispatch] = useReducer(categories, InitialCategoriesState);
  // const [applicationsState, applicationsDispatch] = useReducer(applications, InitialApplicationsState);

  // useEffect(() => {

  //   categoriesDispatch(FetchCategoriesAction());
  //   FetchCategories().then((response) => {
  //     categoriesDispatch(FetchCategoriesSucceedAction(rawCategories.categories));
  //   }).catch((error) => {
  //     // categoriesDispatch(FetchCategoriesFaildAction(error));
  //     categoriesDispatch(FetchCategoriesSucceedAction([{"shortName":"audio","id":"4908C139-4A1F-4BEF-A03E-6337DCF2AFFA","name":"Audio"},{"id":"4ED37455-D6EC-4F29-8F24-71397326D598","shortName":"backup","name":"Backup"},{"id":"F2E1B30B-6F5C-4A04-B06A-2F9AA1CAABB9","shortName":"browser","name":"Browser"},{"shortName":"chat","id":"8426013D-6EF9-4761-A13F-0FAA16482D9D","name":"Chat"},{"shortName":"cryptocurrency","id":"E270D907-0D81-4D49-8BB2-8ED07994BEDB","name":"Cryptocurrency"},{"shortName":"database","id":"4B7EB61E-E839-42A0-A32F-22EA3160AC0B","name":"Database"},{"id":"5F7590B2-D2EA-4E99-8B6E-A276216D057F","name":"Development","shortName":"development"},{"shortName":"downloader","name":"Downloader","id":"DBEF50CB-B995-4686-AF18-44499EB551EF"},{"id":"A4B8602E-DB8D-445C-A708-440491D1130B","name":"Editors","shortName":"editors"},{"shortName":"extensions","name":"Extensions","id":"AAFB13F6-B89B-44AB-81C8-100B65A57E72"},{"id":"3414F02C-7F7B-4975-9319-588014626E8F","name":"Finder","shortName":"finder"},{"id":"C9304834-D293-4D26-BDCB-E77AB9E0EFF5","shortName":"games","name":"Games"},{"id":"50BFAB83-61BB-44F5-B6C9-B54DF3BC016D","shortName":"graphics","name":"Graphics"},{"shortName":"ide","id":"AE784AC2-27DC-461D-A78C-3B47952938C6","name":"IDE"},{"id":"C5F7706D-0CC2-463A-85CB-82F890ED0C20","shortName":"images","name":"Images"},{"id":"01CDFCE4-4C32-4F55-AB82-A328ABA278AA","shortName":"keyboard","name":"Keyboard"},{"shortName":"mail","id":"46166E60-8E59-470E-869A-1F3A8052F5A5","name":"Mail"},{"shortName":"medical","id":"9BAF6781-6411-4232-9F9C-2B57F362B6F8","name":"Medical"},{"shortName":"menubar","id":"F16C0A87-4B8D-4E79-81B6-42CEE8E1AB9B","name":"Menubar"},{"id":"839F04F1-B2BD-4AD7-91F0-E10A53A88015","shortName":"music","name":"Music"},{"id":"E65CC833-794B-4217-A3AC-005F8CFAD1B8","shortName":"news","name":"News"},{"id":"E5FD7BC6-E4B6-4410-A6DF-3B38575D6AD1","shortName":"notes","name":"Notes"},{"shortName":"other","id":"18B087F7-3E6C-4329-BB6D-E328685DE34C","name":"Other"},{"id":"44418D80-5A46-4809-9437-57B40226E9B6","shortName":"player","name":"Player"},{"id":"A1CC4465-D195-41D0-955C-C373FEC8D0FA","shortName":"podcast","name":"Podcast"},{"shortName":"productivity","id":"03218B87-F10E-46F2-86F5-AD234DDC7E57","name":"Productivity"},{"shortName":"screensaver","id":"49FAED02-58B7-46D3-9BAF-14AA626323A0","name":"Screensaver"},{"shortName":"security","id":"C3BFF250-616E-4A7F-9EAB-05F2C04CCADB","name":"Security"},{"id":"8A3EA454-B5EC-4726-B1D2-A51F8F92D685","shortName":"sharing-files","name":"Sharing Files"},{"id":"B6655A0E-F29C-474D-9E01-DA99B0FF12DB","shortName":"social-networking","name":"Social Networking"},{"shortName":"streaming","id":"0D753B26-A109-4546-AD4B-4B23D559C7DD","name":"Streaming"},{"shortName":"system","id":"6E0D6CDD-9492-49A1-81C6-0053E78C78BF","name":"System"},{"id":"0ECD20CC-A1DF-472F-9A9D-102DE2730174","shortName":"terminal","name":"Terminal"},{"id":"BD1CF341-38DB-4036-8676-A08E00432889","shortName":"touch-bar","name":"Touch Bar"},{"id":"D5D583CD-9894-498A-88C1-DB3C52A4C795","shortName":"utilities","name":"Utilities"},{"id":"753526DD-3DD0-4EA2-9C66-69C902F6DB96","shortName":"vpn--proxy","name":"VPN & Proxy"},{"shortName":"video","id":"C06225FA-058A-4526-A213-61C5FE28253F","name":"Video"},{"id":"F5EAC4FA-9117-4465-9B34-6D24D1C28500","shortName":"wallpaper","name":"Wallpaper"},{"shortName":"window-management","id":"EF410C71-4E04-4907-9F8B-839843E9678E","name":"Window Management"},{"shortName":"git","id":"055CFF7A-6FBB-4006-AA82-6CA7016D6708","name":"Git"},{"shortName":"ios--macos","id":"01F7ADCD-9C28-4335-BB4E-3D50576AB24C","name":"iOS \/ macOS"},{"id":"5C3310A0-D73B-4C6A-8B5D-1D1BA45D308B","shortName":"json-parsing","name":"JSON Parsing"},{"shortName":"web-development","id":"999155DD-BB63-4F3A-B0BA-2E902CD69C30","name":"Web Development"},{"id":"E40BF824-7A99-4C97-8782-AF9D906D4F29","shortName":"other-development","name":"Other Development"},{"id":"D3156599-ED87-44EC-A8F5-4C85450A098F","shortName":"csv","name":"CSV"},{"shortName":"json","id":"45ECAE4B-79BE-4CF1-9E65-7020E91DFFEA","name":"JSON"},{"shortName":"markdown","id":"78707473-72CA-4706-A229-FBD6AF8D2AC6","name":"Markdown"},{"id":"25AC8EC1-CA57-47F2-BF2D-F9CC71CD0B0F","shortName":"tex","name":"TeX"},{"shortName":"text","id":"36361242-37B7-4EBD-8F15-AB979ECB85FA","name":"Text"}]));
  //   });

  //   applicationsDispatch(FetchApplicationsAction({status: true}));
  //   setTimeout(() => {
  //     applicationsDispatch(FetchApplicationsSucceedAction(rawApplications.applications));
  //   }, 1000)
  // }, [])

  return (
    // <AppContext.Provider value={
    //   {
    //     state: {
    //       categories: categoriesState,
    //       applications: applicationsState
    //     },
    //     dispatches: {
    //       categories: categoriesDispatch,
    //       applications: applicationsDispatch
    //     }
    //   }
    // }>
      <main className={styles.container}>
        <Router>
          <aside className={styles['categories-list']}>
            <CategoriesList />
          </aside>
          <section className={styles.content}>
            <Switch>
              <Route exact path={PathBuilder.build(APP_ROUTES.HOME)} component={Home} />
              <Route exact path={PathBuilder.build(APP_ROUTES.CATEGORY)} component={Categoty} />
              <Route exact path={PathBuilder.build(APP_ROUTES.APPLICATION)} component={Application} />

              <Route path="*">
                <Redirect to={PathBuilder.build(APP_ROUTES.HOME)} />
              </Route>
            </Switch>
          </section>
        </Router>
      </main>
    // </AppContext.Provider>
  );
}

export default App;
