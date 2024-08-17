import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookDetails from './screens/book-details/BookDetails';
import Home from './screens/home/Home';
import NotFound from './screens/not-found/NotFound';
import LogIn from './screens/log-in/LogIn';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LogIn />} />
                <Route path='/' element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path='/books/:id' element={
                    <ProtectedRoute>
                        <BookDetails />
                    </ProtectedRoute>
                } />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}


export default Router;