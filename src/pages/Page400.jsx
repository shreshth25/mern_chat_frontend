import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page400 = () => {
  return (
<section className="content">
  <div className="error-page mt-5">
    <h2 className="headline text-warning"> 404</h2>
    <div className="error-content">
      <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Page not found.</h3>
      <p>
        We could not find the page you were looking for.
        Meanwhile, you may <NavLink to="/">return to dashboard</NavLink> or try using the search form.
      </p>
      <form className="search-form">
        <div className="input-group">
          <input type="text" name="search" className="form-control" placeholder="Search" />
          <div className="input-group-append">
            <button type="submit" name="submit" className="btn btn-warning"><i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>

  );
};

export default Page400;
