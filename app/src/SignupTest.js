import React, { useState, useEffect } from "react";

export default function SignupTest() {
    const [formData, setFormData] = useState({name: '', email: ''});

    const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data); // do something with the response data
    }

    return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <button type="submit">Submit</button>
    </form>
    );
}