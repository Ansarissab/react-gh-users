import { useState } from 'react'
import UserList from './components/UserList';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Button, Container, Row } from 'react-bootstrap'


import axios from 'axios'
const BASE_URL = 'https://api.github.com/search/users'

function App() {
  const [username, setUsername] = useState("")
  const [users, setUsers] = useState([])

  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(BASE_URL,{
      params: {q: username, per_page: 100}
    }).then(res => {
      setUsers(res.data)
    }).catch(e => {
      console.log(e)
    })
  }
  const handleClearUsers = ()=>{
    setUsername("")
    setUsers([])
  }
  return (
    <Container className="App">
      <h1 className="mt-2">Search Github Users</h1>
      <Form className="mt-2">
        <Row className="align-items-end">
          <Col className="col-8">
            <Form.Control
              onChange={handleChange}
              value={username}
              name="username"
              type="text"
              placeholder="Enter user name"
              autoComplete="off"
            />
          </Col>
          <Col >
            <Form.Group className="mt-2">
              <Button type='submit' variant="success" onClick={handleSubmit}>Submit</Button>
              <Button type='button' variant="danger" onClick={handleClearUsers}>Clear</Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div className="mt-5">
        {users.items && users.items.map((user)=>{
          return(<UserList key={user.id} user={user} />)
        })}
      </div>
    </Container>
  );
}

export default App;
