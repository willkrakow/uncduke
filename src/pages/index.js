import React from 'react'

const Index = () => {
  
  const handleSubmit = (choice) => {
    fetch('/api/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        choice
      })
    })
  };

  return (
    <div>
      <h3>Who do you think is gonna win tonight?</h3>
      <div className="buttonwrapper">
        <button onClick={() => handleSubmit({team: "UNC"})}>Carolina</button>
        <button onClick={() => handleSubmit({team: "Duke"})}>Duke</button>
      </div>
    </div>
  )
}

export default Index;