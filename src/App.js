import { useState, useEffect } from 'react';
import './App.scss';
import ButtonPanel from './Components/Button-Panel/ButtonPanel.js';
import axios from 'axios';
import ListsAndSearch from './Components/ListsAndSearch/ListsAndSearch.js';
import GoFish from './Components/GoFish/GoFish.js';
import LoginButton from './Components/Login-Signup/Login-Button';
import LogoutButton from './Components/Login-Signup/Logout-Button';
import Profile from './Components/Login-Signup/Profile';
import { Row, Col, Container, Image } from 'react-bootstrap';
import bg from './images/bg1.png';

const App = () => {
  const [user, setUser] = useState(1);
  const [userID, setUserID] = useState(0);
  const [myMovies, setMyMovies] = useState([]);
  const [friends, setFriends] = useState([]);
  const [popular, setPopular] = useState([]);

  const getUserID = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/user/${user.email}`);
      const userID = response.data;
      setUserID(userID);
      getMyMovies(userID);
      getFriends(userID);
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserID();
  }, [user]);

  // get movie list for user once logged in
  const getMyMovies = (user_id) => {
    console.log(user_id);
    axios.get(`http://localhost:3005/movies/${user_id}`)
      .then((response => setMyMovies(response.data)))
      .catch((error) => console.log(error));
  };
  // get friends list for user once logged in
  const getFriends = (user_id) => {
    axios.get(`http://localhost:3005/friends/${user_id}`)
      .then((response => setFriends(response.data)))
      .catch((error) => console.log(error));
  };

  // pass this event handler down to login component
  const handleUserChange = (user) => {
    setUser(user);
  }

  const rowStyleRight = {
    className: 'justify-content-md-right',
  }
  // const background = {
  //   backgroundImage: linearGradient(red, yellow, green),
  // }

  console.log('user:', user);

  return (
    <Container
    style={{ background:`linear-gradient(#88CDDC, #E389A9, #E1B7D5)` }}
    >
      <div className="App">
      <h4>Go Fish</h4>
        <Row>
          <Col style={rowStyleRight}>
            <div className="login-container">
              <h1>GOFISH</h1>
              <LoginButton />
              <LogoutButton />
              <Profile setUser={setUser} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="button-panel">
              <ButtonPanel
                myMovies={myMovies}
                friends={friends}
                user={user}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <GoFish popular={popular} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="lists-and-search">
              <ListsAndSearch
                myMovies={myMovies}
                user={user}
                getMyMovies={getMyMovies}
                setPopular={setPopular}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default App;
