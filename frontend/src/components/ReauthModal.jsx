// frontend/src/components/ReauthModal.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  reauthenticateWithPopup,
  signInWithPopup
} from "firebase/auth";

/**
 * Props:
 *  - user: firebase currentUser
 *  - onSuccess(): called when reauth done
 *  - onCancel(): optional
 */
export default function ReauthModal({ user, onSuccess, onCancel }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  // helper to check if provider is Google or password
  const providers = (user?.providerData || []).map(p => p.providerId);
  const hasPassword = providers.includes("password");
  const hasGoogle = providers.includes("google.com");

  async function handlePasswordReauth(e) {
    e?.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, cred);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to reauthenticate");
    }
    setBusy(false);
  }

  async function handleGoogleReauth() {
    setError(null);
    setBusy(true);
    try {
      // reauthenticateWithPopup exists in modular SDK; if it's not available in your SDK,
      // fallback to signInWithPopup (it will refresh the session).
      if (typeof reauthenticateWithPopup === "function") {
        await reauthenticateWithPopup(user, googleProvider);
      } else {
        // fallback: sign in again with popup, then the currentUser will be updated
        await signInWithPopup(auth, googleProvider);
      }
      onSuccess();
    } catch (err) {
      setError(err.message || "Google reauthentication failed");
    }
    setBusy(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-2">Confirm your identity</h3>
        <p className="text-sm text-slate-600 mb-4">To view your Memories we need you to re-authenticate with the same account you used to sign in.</p>

        {hasPassword && (
          <form onSubmit={handlePasswordReauth} className="space-y-3 mb-3">
            <input
              type="password"
              placeholder="Enter account password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className="px-3 py-2 bg-slate-800 text-white rounded">
                {busy ? "Working..." : "Confirm"}
              </button>
              <button type="button" onClick={onCancel} className="px-3 py-2 border rounded">Cancel</button>
            </div>
          </form>
        )}

        {hasGoogle && (
          <div className="mb-3">
            <button onClick={handleGoogleReauth} disabled={busy} className="w-full px-3 py-2 rounded border flex items-center justify-center gap-2">
              {busy ? "Working..." : "Reauthenticate with Google"}
            </button>
          </div>
        )}

        {!hasPassword && !hasGoogle && (
          <div className="text-sm text-slate-500 mb-3">
            No reauthentication method detected. Try signing out and signing in again with your provider.
          </div>
        )}

        {error && <div className="text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
}
