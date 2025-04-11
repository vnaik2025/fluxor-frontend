import React from "react";
import PropTypes from "prop-types";
// import { Header, Footer, Sidebar, TopNavBar } from "../common";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
// import { logout } from "../../store/auth/authActions";
import AdminSidebar from "../common/adminsidebar/adminsidebar";
import Loader from "../common/loader/loader";
import { fetchAllUsers } from "../../store/auth/authActions";

import './MainLayout.css';

class MainLayout extends React.Component {
  componentDidMount() {

    this.props.fetchAllUsers()
  }

  render() {
    return (
      <div className=" w-screen h-screen flex flex-row items-center min-h-screen bg-gray-100">
        <AdminSidebar />
        

        <main className="h-screen w-screen overflow-auto scrollbar-hide">
          <Loader/>

          {this.props.children}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchAllUsers}, dispatch);

const mapStateToProps = (state) => (
  console.log("redux state",state),{});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
