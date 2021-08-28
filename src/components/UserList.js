import React from 'react'
import { Card, Nav } from 'react-bootstrap'

function UserList({user}) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Nav.Link href={user.html_url}>
              <Card.Title>
                <h4>{user.login}</h4>
              </Card.Title>
            </Nav.Link>
          </div>
        <div>
          <img src={user.avatar_url} alt={user.avatar_url} height="50" className="rounded-circle ml-5"/>
        </div>
      </div>
      </Card.Body>
    </Card>
  )
}

export default UserList
