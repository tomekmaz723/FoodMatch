import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinInput from '../components/PinInput/PinInput';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import NavBar from '../components/NavBar/NavBar';
import ScreenHeader from '../components/ScreenHeader/ScreenHeader';
import MobileLayout from '../layouts/MobileLayout';
import styles from './JoinRoomPage.module.css';

/* Person icon for the nickname field */
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/**
 * JoinRoomPage — screen where a user enters a 4-digit PIN
 * and a nickname to join an existing room.
 */
function JoinRoomPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState(['', '', '', '']);
  const [nickname, setNickname] = useState('');
  const canJoin = pin.every(Boolean) && nickname.trim().length >= 1;

  const handleJoinRoom = () => {
    if (!canJoin) return;

    navigate('/waiting', { state: { roomPin: pin.join('') } });
  };

  return (
    <MobileLayout>
      <div className={styles.page}>
      <ScreenHeader title="Join Room" backButton variant="inside" />
      {/* ── Hero thumbnail ── */}
      <div className={styles.heroThumb} aria-hidden="true">
        <img
          className={styles.heroImage}
          src="/hero_food.png"
          alt="Communal dining table filled with dishes"
        />
      </div>

      {/* ── Main card ── */}
      <section className={styles.card}>
        <div className={styles.headerGroup}>
          <h1 className={styles.title}>Enter Room PIN</h1>
          <p className={styles.subtitle}>
            Ask your friends for the 4-digit code to
            start matching dishes.
          </p>
        </div>

        <PinInput label="Room PIN" value={pin} onChange={setPin} />

        <InputField
          label="Your Nickname"
          placeholder="e.g. FoodieKing"
          icon={<PersonIcon />}
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          minLength={1}
          required
        />
        
        <div className={styles.actions} style={{ marginTop: '24px' }}>
          <Button variant="filled" onClick={handleJoinRoom} disabled={!canJoin}>Join Room</Button>
        </div>
      </section>
      </div>
      <NavBar activeTab="join-room" />
    </MobileLayout>
  );
}

export default JoinRoomPage;
