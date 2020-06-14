import {Route, Switch} from 'react-router-dom'
import LoginUI from './ui/LoginUI'
import {userLogin, HomePage, MenuPage, TeaPage, BubbleTeaPage, FruitTeaPage, TeaDetailPage, FavoriatesPage, BagPage} from './containers'
import HomeUI from './ui/HomeUI'
import Test from './ui/TestUI'
import NotFoundUI from './ui/NotFoundUI'
import Cookies from 'universal-cookie'
import MenuUI from './ui/MenuUI'
import "../stylesheets/APP.css"

const App = () =>
  <Switch>
    <Route path="/" component={({match, location}) => (
      <div className="app">
        <MenuPage selected={location.pathname}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={userLogin} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/favoriates" component={FavoriatesPage} />
          <Route exact path="/tea" component={TeaPage} />
          <Route exact path="/bag" component={BagPage} />
          <Route exact path="/bubble-tea" component={BubbleTeaPage} />
          <Route exact path="/fruit-tea" component={FruitTeaPage} />
          <Route exact path="/tea/detail/:id" component={TeaDetailPage} />
          <Route exact path="/bubble-tea/detail/:id" component={TeaDetailPage} />
          <Route exact path="/fruit-tea/detail/:id" component={TeaDetailPage} />
          <Route component={NotFoundUI} />
        </Switch>
      </div>

    )} />

  </Switch>

export default App
