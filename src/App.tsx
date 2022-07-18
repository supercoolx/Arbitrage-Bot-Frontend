import "assets/css/global.css"
import { Provider } from 'react-redux'
import store from 'redux/store'
import Home from "pages/Home";
import StateManagement from "components/StateManagement";


export const App = () => {

    return (
        <Provider store={store}>
            <StateManagement>
                <Home />
            </StateManagement>
        </Provider>
    );
};

export default App;
