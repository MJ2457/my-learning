import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Auth = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="auth-container">
      {user ? (
        <div className="user-info">
          <img src={user.photoURL} alt="User" className="user-avatar" />
          <span>{user.displayName}</span>
          <button onClick={() => signOut(auth)} className="sign-out-button">
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className="sign-in-button">
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
