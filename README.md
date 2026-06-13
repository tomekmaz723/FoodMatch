# FoodMatch

FoodMatch to webowa aplikacja React do wybierania restauracji ze znajomymi. Użytkownik może utworzyć pokój albo dołączyć do istniejącego, ustawić preferencje kulinarne, przeglądać restauracje w formie kart typu swipe i zobaczyć końcowy wynik dopasowania grupy. Projekt został przygotowany jako dopracowana aplikacja mobile-first z responsywnym widokiem desktopowym.

Aplikacja online: https://foodmatch-75d50.web.app

Projekt Firebase: https://console.firebase.google.com/project/foodmatch-75d50/overview

## Konto Demo

Do sprawdzenia aplikacji można użyć lokalnego konta testowego z przygotowanymi danymi:

```txt
Email: test@test.com
Hasło: test
```

Profil demo zawiera zapisane preferencje, ulubione restauracje, historię decyzji, liczbę hostowanych pokoi, dopasowania i statystyki. Nowi użytkownicy Firebase zaczynają z pustymi danymi profilu, które aktualizują się podczas korzystania z aplikacji.

## Główne Funkcje

- Logowanie Firebase Authentication przez email/hasło oraz Google.
- Profil demo z gotowymi ulubionymi restauracjami, historią, preferencjami, pokojami i dopasowaniami.
- Tworzenie pokoju z losowym PIN-em, zapisanymi preferencjami, kontrolą promienia wyszukiwania i listą dołączonych osób.
- Dołączanie do pokoju z walidacją PIN-u i nickname.
- Waiting Room z udostępnianiem PIN-u, kopiowaniem do schowka, animowanym statusem i przyciskiem gotowości.
- Swipe restauracji w stylu aplikacji randkowych, z losową kolejnością kart.
- Runda składająca się z pięciu kart i końcowy ekran Match albo No Match.
- Ekrany Match i No Match otwierają szczegóły właściwej restauracji.
- Strona ulubionych z wyszukiwarką, filtrami i klikalnymi kartami restauracji.
- Strona historii ze statystykami i klikalnymi ostatnimi dopasowaniami.
- Profil użytkownika z edycją preferencji, ustawieniami konta, powiadomieniami i przejściem do historii.
- Responsywny układ mobile-first z klasycznym układem zakładek na większych ekranach.
- Śledzenie pageview w Google Analytics.
- Integracja Hotjar/Contentsquare.
- Konfiguracja Firebase Hosting.

## Technologie

- React 19
- Vite
- React Router
- Firebase Authentication
- Firebase Hosting
- React GA4
- Hotjar Browser SDK
- CSS Modules

## Struktura Projektu

```txt
src/
  components/
    AnalyticsListener/
    AppLogo/
    Avatar/
    BrandLogo/
    Button/
    Chip/
    HotjarInitializer/
    InputField/
    NavBar/
    PinInput/
    ProtectedRoute/
    RestaurantCard/
    ScreenHeader/
    StatCard/
  context/
    AuthContext.jsx
    UserDataContext.jsx
  data/
    restaurants.js
  layouts/
    MobileLayout.jsx
  pages/
    AuthLoginPage.jsx
    FavoritesPage.jsx
    HistoryPage.jsx
    JoinRoomPage.jsx
    LobbyPage.jsx
    LoginPage.jsx
    MatchResultPage.jsx
    NoMatchPage.jsx
    NotFoundPage.jsx
    ProfilePage.jsx
    RestaurantDetailPage.jsx
    SignupPage.jsx
    SwipePage.jsx
    WaitingRoomPage.jsx
```

## Zmienne Środowiskowe

Utwórz lokalny plik `.env` na podstawie `.env.example`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_HOTJAR_SITE_ID=1234567
VITE_HOTJAR_VERSION=6
```

W Firebase Authentication powinny być włączone następujące metody logowania:

- Email/Password
- Google

Dla lokalnego developmentu domena `localhost` powinna znajdować się na liście autoryzowanych domen w Firebase Authentication.

## Skrypty

Instalacja zależności:

```bash
npm install
```

Uruchomienie środowiska developerskiego:

```bash
npm run dev
```

Zbudowanie wersji produkcyjnej:

```bash
npm run build
```

Podgląd wersji produkcyjnej:

```bash
npm run preview
```

Deploy do Firebase Hosting:

```bash
npm run build
firebase deploy
```

## Routing

Aplikacja korzysta z React Router. Główne ścieżki:

```txt
/                 Strona startowa
/auth/login       Logowanie
/auth/signup      Rejestracja
/lobby            Lobby hosta / tworzenie pokoju
/join             Dołączanie do pokoju
/waiting          Waiting Room uczestnika
/swipe            Swipe restauracji
/result           Wynik Match
/nomatch          Wynik No Match
/restaurant       Szczegóły restauracji
/favorites        Ulubione użytkownika
/profile          Profil użytkownika
/history          Historia jedzenia
*                 Fallback 404
```

Chronione ścieżki:

- `/favorites`
- `/profile`
- `/history`

## Analityka

Google Analytics jest inicjalizowane przez komponent `AnalyticsListener`. Komponent wysyła zdarzenie `pageview` przy każdej zmianie lokalizacji w React Router.

<img width="1502" height="807" alt="image" src="https://github.com/user-attachments/assets/dcb4228f-3ad4-4359-87ca-7d11020a2adc" />


Hotjar jest inicjalizowany przez `HotjarInitializer`, jeśli dostępna jest zmienna `VITE_HOTJAR_SITE_ID`.

## Screenshoty Do Oddania Projektu

Przed finalnym oddaniem projektu warto dodać screenshoty:

- Ekrany aplikacji: login, join room, lobby, swipe, match/no-match, favorites, profile, history.
- Panel Google Analytics pokazujący ruch w aplikacji.
- Panel Hotjar/Contentsquare pokazujący działające śledzenie.
- Ekran wdrożenia Firebase Hosting albo URL działającej aplikacji.

Sugerowany folder:

```txt
docs/screenshots/
```

## Uwagi

Aplikacja używa Firebase Authentication dla prawdziwych użytkowników. Historia restauracji, ulubione, preferencje i statystyki są w tym prototypie zapisywane lokalnie w `localStorage` według identyfikatora użytkownika. Struktura danych jest przygotowana tak, aby w przyszłości można było przenieść ją do Firestore, jeśli potrzebna będzie synchronizacja między urządzeniami.
