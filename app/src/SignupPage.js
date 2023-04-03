import React, { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({username: '', email: '', password: ''});
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
          <div>
            <h4>Username</h4>
            <input type="text" name="username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
          </div>
          <div>
          <h4>Email</h4>
            <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
          <h4>Password</h4>
            <input type="text" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit">Submit</button>
      </form>
    </div>
  );
}