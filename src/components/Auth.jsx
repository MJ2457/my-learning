import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

function Auth() {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="auth-container">
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign In with Google
        </button>
      )}
    </div>
  );
}

export default Auth;
