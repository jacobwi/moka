import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignupPage from './components/pages/SignupPage'
import ForgotPasswordPage from './components/pages/ForgotPasswordPage'
import UserSettingsPage from './components/pages/UserSettingsPage'
import BookmarksPage from './components/pages/BookmarksPage'
import TagsPage from './components/pages/TagsPage'
import CategoriesPage from './components/pages/CategoriesPage'

import DashboardPage from './components/pages/DashboardPage'
import AppSettingsPage from './components/pages/AppSettingsPage'
import ProfilePage from './components/pages/ProfilePage'
import { useAuthInterceptor } from 'shared/hooks'
import { AuthProvider } from 'shared/contexts/AuthContext'
import { UserProvider } from 'shared/contexts/UserContext'
import { BookmarkProvider } from 'shared/contexts/BookmarkContext'
import { LayoutManager } from 'shared/ui'
import { ProtectedRoute } from 'shared/routes'
import { UserSettingsProvider } from 'shared/contexts/UserSettingsContext'
const App = () => {
  useAuthInterceptor() // Set up the interceptor

  return (
    <AuthProvider>
      <UserSettingsProvider>
        <UserProvider>
          <BookmarkProvider>
            {' '}
            {/* Wrap BookmarkProvider around Router */}
            <Router>
              <Routes>
                {/* Routes with Header and Footer */}
                <Route
                  path="/"
                  index
                  element={
                    <LayoutManager>
                      <HomePage />
                    </LayoutManager>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <LayoutManager>
                        <DashboardPage />
                      </LayoutManager>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookmarks"
                  element={
                    <ProtectedRoute>
                      <LayoutManager>
                        <BookmarksPage />
                      </LayoutManager>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tags"
                  element={
                    <ProtectedRoute>
                      <LayoutManager>
                        <TagsPage />
                      </LayoutManager>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute>
                      <LayoutManager>
                        <CategoriesPage />
                      </LayoutManager>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/settings"
                  element={
                    <ProtectedRoute>
                      <LayoutManager>
                        <UserSettingsPage />
                      </LayoutManager>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/profile"
                  element={
                    <ProtectedRoute>
                      <LayoutManager>
                        <ProfilePage />
                      </LayoutManager>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <LayoutManager>
                        <AppSettingsPage />
                      </LayoutManager>
                    </ProtectedRoute>
                  }
                />
                {/* Routes without Header and Footer */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignupPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
              </Routes>
            </Router>
          </BookmarkProvider>
        </UserProvider>
      </UserSettingsProvider>
    </AuthProvider>
  )
}

export default App
