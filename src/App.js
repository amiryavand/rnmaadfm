import React, {Component} from 'react';
import {Platform, StyleSheet, I18nManager} from 'react-native';
import {Drawer, Router, Scene, Tabs} from 'react-native-router-flux';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./store";
import {connect, Provider} from "react-redux";
import {Icon, Text} from "native-base";

// import Login from "./components/auth/login";
// import Register from "./components/auth/register";
import Splash from "./components/splash";


I18nManager.forceRTL(true);

export default class App extends Component {

    render() {
        const RouterWithRedux = connect()(Router);
        return (
            <Provider store={store}>
                <PersistGate loading={<Splash/>} persistor={persistor}>
                    <RouterWithRedux>
                        <Scene key="container" hideNavBar>
                            <Scene key="splash" component={Splash} initial/>
                            {/* <Scene key="auth" hideNavBar>
                                <Scene key="login" component={Login}/>
                                <Scene key="register" component={Register} initial/>
                            </Scene> */}
                        </Scene>
                    </RouterWithRedux>
                </PersistGate>
            </Provider>
        );
    }

    _tabIcon({focused, iconName}) {
        return (
            <Icon name={iconName} style={{
                width: 28,
                height: 28,
                marginEnd: 10,
                marginBottom: 0,
                color: focused ? '#2ECC71' : '#707070',
                fontSize: focused ? 26 : 24
            }}/>
        )
    }

    _backBtn() {
        return (
            <Icon name="md-arrow-back" onPress={() => Actions.pop()} style={styles.backBtn}/>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECF0F1',
    },
    primaryStepText: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    stepHistory: {
        flexDirection: 'row',
        marginTop: 50,
    },
    navBarTitle: {
        marginStart: 10,
        ...Platform.select({
            ios: {
                fontFamily: 'IRANSansMobile',
                fontWeight: 'bold'
            },
            android: {
                fontFamily: 'IRANSansMobile_Bold'
            }
        })
    },
    messageText: {
        marginBottom: 20,
        fontSize: 18,
        ...Platform.select({
            ios: {
                fontFamily: 'IRANSansMobile',
                fontWeight: 'bold'
            },
            android: {
                fontFamily: 'IRANSansMobile_Bold'
            }
        })
    },
    labelStyles: {
        fontSize: 10,
        ...Platform.select({
            ios: {
                fontFamily: 'IRANSansMobile',
                fontWeight: '100'
            },
            android: {
                fontFamily: 'IRANSansMobile_UltraLight'
            }
        })
    }
});
