import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Home'
import About from './About'
import NewPost from "./NewPost";
import Header from "./Header";
import PostPage from "./PostPage";
import Footer from "./Footer";
import Missing from "./Missing";
import Nav from "./Nav";
import EditPost from "./EditPost";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";
function App() {
  const setPosts=useStoreActions((actions)=>actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
      setPosts(data);
  }, [data,setPosts])
  return (
    <BrowserRouter>
      <div className="App">
          <Header title="React JS Blog" />
          <Nav/>
          <Routes>
            <Route path="/" element={
              <Home
                isLoading={isLoading}
                fetchError={fetchError}
                />}/>
            <Route path="post" element={<NewPost/>} />
            <Route path="edit/:id" element={<EditPost />} />

            <Route path="/post/:id" element={<PostPage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing/>} />
          </Routes>
          
          <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
