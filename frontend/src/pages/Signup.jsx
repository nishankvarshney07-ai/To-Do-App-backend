import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password,
            passwordConfirm
          })
        }
      );

      const data = await response.json();

      console.log('Signup response:', data);

      if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }

    } catch (error) {
      console.log('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-5">

          <div>
            <label className="block mb-2">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
          >
            Sign Up
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;