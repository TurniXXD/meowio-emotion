import { Container, globalStyles } from './styles/shared';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Articles from './pages/Articles';
import Login from './pages/Login';
import CreateArticle from './pages/CreateArticle';
import MyArticles from './pages/MyArticles';
import EditArticle from './pages/EditArticle';
import Article from './pages/Article';
import Nav from './components/Nav';
import { ProtectedRoute } from './auth';
import { initAxiosInstance } from './api/config';
import useCookieStore from './stores/useCookieStore';
import useArticlesCountStore from './stores/useArticlesCountStore';
import { useEffect } from 'react';
import { ArticlesService } from './api';

const App = () => {
  const { cookies } = useCookieStore();
  const { setArticlesCount } = useArticlesCountStore();

  initAxiosInstance(cookies.auth);

  // This is just to test out zustand
  useEffect(() => {
    if (cookies.auth) {
      const fetchArticlesCount = async () => {
        const articlesCount = await ArticlesService.count();
        setArticlesCount(articlesCount.count || 0);
      };
      fetchArticlesCount();
    }
  }, [cookies, setArticlesCount]);

  return (
    <>
      {globalStyles}
      <Nav />
      <Container>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <Articles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles/:articleId"
            element={
              <ProtectedRoute>
                <Article />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-article"
            element={
              <ProtectedRoute ownerProtected>
                <CreateArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-article"
            element={
              <ProtectedRoute ownerProtected>
                <EditArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-articles"
            element={
              <ProtectedRoute ownerProtected>
                <MyArticles />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
