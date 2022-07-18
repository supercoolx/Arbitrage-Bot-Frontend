import "assets/css/global.css"
import { Provider } from 'react-redux'
import store from 'redux/store'
import Home from "pages/Home";


export const App = () => {

    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
};

export default App;
