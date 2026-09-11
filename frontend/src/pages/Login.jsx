import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      console.log('Backend response:', data);

      if (data.status === 'success') {
        localStorage.setItem('token', data.token);

        navigate('/dashboard');
      }

    } catch (error) {
      console.log('Request failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Todo App
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block mb-2">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
          >
            Login
          </button>
          <p className="text-center text-slate-400 mt-5">
          Don't have an account?{' '}
           <Link
             to="/signup"
              className="text-blue-400 hover:text-blue-300"
           >
              Sign Up
            </Link>
</p>

        </form>

      </div>
    </div>
  );
}

export default Login;