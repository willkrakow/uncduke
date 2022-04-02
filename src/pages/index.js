import React from 'react'
import './index.css';

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
      <div className="wrapper">
        <h3 className="title">Who's gonna win tonight?</h3>
        <div className="buttonwrapper">
          <button className="team unc" id="unc">
            Carolina
          </button>
          <button className="team duke" id="duke">
            Duke
          </button>
        </div>
      </div>
    </div>

  )
}

export default Index;