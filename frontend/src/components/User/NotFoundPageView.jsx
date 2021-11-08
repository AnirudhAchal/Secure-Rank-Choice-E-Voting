import React from 'react';
import lighthouse from "../styles/images/lighthouse.jpg"
import "../styles/NotFoundPage.css";
import { Link } from 'react-router-dom';

function NotFoundPageView() {
    return (
        <div>
             <div>
                <div class="card">
                    <div className="center card-body text-center" style={{width:"35rem"}}>
                        <h1 className="mt-4 card-title mb-4 notFound">404</h1>
                        <h3 className="card-text mb-3">Sorry, we coundn't find the page...</h3>
                        <img className="card-img-bottom" src={lighthouse} alt="404 light house"></img>
                        <p>But we are here to help- maybe you want to go to this page</p>
                        <Link className = "text-center" to = "/" style={{fontSize:"1.5rem"}}>Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPageView
