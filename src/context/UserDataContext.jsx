import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { restaurants } from '../data/restaurants';

const UserDataContext = createContext(null);
const STORAGE_KEY = 'foodmatch:user-data';

const defaultPreferences = {
  price: [],
  cuisine: [],
  dietary: [],
  radius: 2,
};

const createEmptyProfile = (user) => ({
  displayName: user?.displayName || '',
  email: user?.email || '',
  roomsHosted: 0,
  totalMatches: 0,
  totalDecisions: 0,
  topCuisine: '-',
  preferencesSaved: false,
  preferences: defaultPreferences,
  notificationsEnabled: false,
  favorites: [],
  history: [],
});

const testProfile = {
  displayName: 'Test User',
  email: 'test@test.com',
  roomsHosted: 17,
  totalMatches: 64,
  totalDecisions: 91,
  topCuisine: 'Italian',
  preferencesSaved: true,
  preferences: {
    price: ['$', '$$'],
    cuisine: ['Italian', 'Sushi'],
    dietary: ['Vegan', 'Gluten-free'],
    radius: 2,
  },
  notificationsEnabled: true,
  favorites: [
    restaurants.luigis,
    restaurants.sushiZen,
    restaurants.burgerRepublic,
    restaurants.caminoTacos,
  ],
  history: [
    {
      ...restaurants.goldenGrill,
      date: 'Yesterday, 8:30 PM',
      avatars: ['/avatar_alex.png', '/avatar_sarah.png'],
      plusCount: 2,
    },
    {
      ...restaurants.sushiZen,
      date: 'Nov 14, 2023',
      avatars: ['/avatar_alex.png', '/avatar_mike.png'],
    },
    {
      ...restaurants.luigis,
      date: 'Nov 12, 2023',
      avatars: ['/avatar_host.png', '/avatar_sarah.png', '/avatar_mike.png'],
    },
    {
      ...restaurants.burgerRepublic,
      date: 'Nov 08, 2023',
      avatars: ['/avatar_alex.png'],
    },
  ],
};

const isTestUser = (user) => {
  const email = user?.email?.toLowerCase() || '';
  return email === 'test@test.com';
};

const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const writeStore = (store) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

function UserDataProvider({ children }) {
  const { currentUser } = useAuth();
  const [store, setStore] = useState({});
  const userId = currentUser?.uid;

  useEffect(() => {
    setStore(readStore());
  }, []);

  useEffect(() => {
    if (!currentUser || store[userId]) return;

    setStore((current) => {
      const profile = isTestUser(currentUser)
        ? { ...testProfile, email: currentUser.email || testProfile.email }
        : createEmptyProfile(currentUser);
      const next = { ...current, [userId]: profile };
      writeStore(next);
      return next;
    });
  }, [currentUser, store, userId]);

  const userData = userId ? store[userId] || createEmptyProfile(currentUser) : null;

  const updateUserData = (updater) => {
    if (!userId) return;

    setStore((current) => {
      const currentProfile = current[userId] || createEmptyProfile(currentUser);
      const nextProfile = typeof updater === 'function'
        ? updater(currentProfile)
        : { ...currentProfile, ...updater };
      const next = { ...current, [userId]: nextProfile };
      writeStore(next);
      return next;
    });
  };

  const savePreferences = (preferences) => {
    updateUserData((profile) => ({
      ...profile,
      preferences,
      preferencesSaved: true,
    }));
  };

  const recordHostedRoom = () => {
    updateUserData((profile) => ({
      ...profile,
      roomsHosted: profile.roomsHosted + 1,
    }));
  };

  const recordDecision = (restaurant, liked) => {
    updateUserData((profile) => {
      const totalDecisions = profile.totalDecisions + 1;
      const totalMatches = liked ? profile.totalMatches + 1 : profile.totalMatches;
      const historyItem = liked
        ? {
            ...restaurant,
            date: 'Today',
            avatars: ['/avatar_alex.png', '/avatar_sarah.png'],
          }
        : null;
      const favorites = liked && !profile.favorites.some((item) => item.id === restaurant.id)
        ? [restaurant, ...profile.favorites]
        : profile.favorites;

      return {
        ...profile,
        totalDecisions,
        totalMatches,
        topCuisine: liked ? restaurant.cuisine || profile.topCuisine : profile.topCuisine,
        favorites,
        history: historyItem ? [historyItem, ...profile.history] : profile.history,
      };
    });
  };

  const value = useMemo(
    () => ({
      userData,
      updateUserData,
      savePreferences,
      recordHostedRoom,
      recordDecision,
    }),
    [userData],
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) throw new Error('useUserData must be used inside UserDataProvider.');
  return context;
}

export { UserDataProvider, useUserData, defaultPreferences };
