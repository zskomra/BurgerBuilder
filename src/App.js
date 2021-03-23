import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  render () {
    return (
      <div >
        <Layout>
           <BurgerBuilder /> 
        </Layout>
      </div>
    );
  } 
}
//check if Interceptors are remove ( -> withErrorHanlder)
  // state = {
  //   show: true,
  // }
  
  // componentDidMount() {
  //   setTimeout(() => {
  //   this.setState({show: false});
  //   }, 4000);
  // }
//   render () {
//     return (
//       <div >
//         <Layout>
//           {this.state.show ? <BurgerBuilder /> : null}
//         </Layout>
//       </div>
//     );
//   } 
// }
  


export default App;
