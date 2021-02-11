import React, {Component} from 'react'
import NavBar from './components/NavBar'
import SimpleTabs from './components/SimpleTabs'
import PersistentDrawer from './components/PersistentDrawer'

class App extends Component {
  render() {
    return (
      <div>
        <SimpleTabs></SimpleTabs>
      </div>
    )
  }
}

export default App;
