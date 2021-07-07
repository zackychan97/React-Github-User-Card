//adding comment for pull request
import React from 'react';
import './App.css';
import axios from "axios";

import UserCard from "./components/UserCard";
import SearchAppBar from "./components/Nav";


class App extends React.Component {
  state = {
    user: [],
    followers: [],
  };

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/zackychan97`)
      .then(response =>{
        console.log(response)
        console.log(response.data.followers_url)
        this.setState({
          user: response.data
        });
        console.log(this.state);
      })
      .catch(err =>{
        console.log(`error`)
      })
    axios
      .get(`https://api.github.com/users/zackychan97/followers`)
      .then(res => {
        console.log(res)
        this.setState({
          followers: res.data
        })
      })
      .catch(err => {
        console.log(`error`)
      })
  }


  render(){
    return (
      <div className="App">
        <SearchAppBar/>
        <div className="cards-grid">
          <UserCard key={this.state.user}  user={this.state.user}/>
          {this.state.followers.map(props =>(
            <UserCard key={props.id} user={props} />
          ))}
        </div>
      </div>
    );
  };
}

export default App;