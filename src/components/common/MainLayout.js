import React,{Component} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import styles from "./common.less";
export default class MainLayout extends Component {

    render() {
        return (
          <div className={styles.main}>
            <Header />
            <div className={styles.wraper}>
              { this.props.children }
            </div>
            <Footer />
          </div>
        );
    }
}
