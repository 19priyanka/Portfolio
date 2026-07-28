import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { AppShell } from './components/layout/AppShell';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { PlaylistPage } from './pages/PlaylistPage';
import { SearchPage } from './pages/SearchPage';
import { ResumePage } from './pages/ResumePage';
import { NotFound } from './pages/NotFound';

/**
 * The route tree, kept separate from the router so a smoke test can mount it
 * under a MemoryRouter without duplicating the route definitions.
 */
export function AppRoutes() {
  return (
    <PlayerProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:slug" element={<PlaylistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/resume" element={<ResumePage />} />

          {/* Routes from the previous site. Kept so links already shared keep
              resolving instead of landing on a 404. */}
          <Route path="/ProjectsHomepage" element={<Navigate to="/playlist/projects" replace />} />
          <Route path="/CapstoneHomepage" element={<Navigate to="/playlist/featured" replace />} />
          <Route
            path="/ExtracurricularHomepage"
            element={<Navigate to="/playlist/community" replace />}
          />
          <Route path="/ResumeHomepage" element={<Navigate to="/resume" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </PlayerProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
