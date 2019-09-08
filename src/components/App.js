import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Home from './common/Home';

export default class App extends React.Component {
    render(){
        return (
            <div className="container-fluid">
                <header className="mb-2">
                    <Navbar />
                </header>

                <main>
                    <Home />
                </main>

                <Footer />
            </div>
            
        );
    }
}