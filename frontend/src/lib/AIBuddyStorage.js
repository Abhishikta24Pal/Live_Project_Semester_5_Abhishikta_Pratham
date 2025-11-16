
import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

/**
 * Ensure a date doc exists: users/{uid}/aiChats/{date}
 */
async function ensureDateDoc(uid, date) {
  const dateRef = doc(db, "users", uid, "aiChats", date);
  const snap = await getDoc(dateRef);
  if (!snap.exists()) {
    await setDoc(dateRef, { date, createdAt: serverTimestamp() });
  }
  return dateRef;
}

/**
 * Save a single message into users/{uid}/aiChats/{date}/messages
 * message = { role: 'user'|'assistant', text: string, extra?: {} }
 */
export async function saveMessage(uid, date, message) {
  if (!uid) throw new Error("No uid provided");
  const dateRef = await ensureDateDoc(uid, date);
  const messagesCol = collection(db, "users", uid, "aiChats", dateRef.id, "messages");
  const payload = {
    role: message.role,
    text: message.text,
    createdAt: serverTimestamp(),
    ...(message.extra ? { extra: message.extra } : {}),
  };
  const docRef = await addDoc(messagesCol, payload);
  return docRef;
}

/**
 * Realtime listener for a date's messages. Returns unsubscribe().
 * callback receives array of message objects (id + data).
 */
export function listenMessagesRealtime(uid, date, callback, onError) {
  if (!uid) throw new Error("No uid for listenMessagesRealtime");
  const messagesCol = collection(db, "users", uid, "aiChats", date, "messages");
  const q = query(messagesCol, orderBy("createdAt", "asc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const arr = [];
      snapshot.forEach((d) => arr.push({ id: d.id, ...d.data() }));
      callback(arr);
    },
    (err) => {
      if (onError) onError(err);
      else console.error("listenMessagesRealtime err", err);
    }
  );
}

/**
 * Fetch messages for a date (non realtime)
 */
export async function fetchMessages(uid, date) {
  const messagesCol = collection(db, "users", uid, "aiChats", date, "messages");
  const q = query(messagesCol, orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  const arr = [];
  snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
  return arr;
}

/**
 * List all saved dates for user (aiChats collection docs)
 */
export async function listSavedDates(uid) {
  const datesCol = collection(db, "users", uid, "aiChats");
  const snap = await getDocs(datesCol);
  const arr = [];
  snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
  // sort descending (newest first)
  arr.sort((a, b) => (a.createdAt?.toMillis?.() || 0) - (b.createdAt?.toMillis?.() || 0));
  return arr.reverse();
}
