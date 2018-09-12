import React, {Component} from 'react';
import {Spinner, Text, View} from "native-base";
import { Actions } from 'react-native-router-flux';
import {StyleSheet, Platform} from 'react-native';

import {connect} from "react-redux";

class SplashScreen extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text style={Styles.mainText}>
                    Irancell
                </Text>
                <Spinner color={'#FFF'}/>
            </View>
        );
    }
}

class Splash extends Component {
    render() {
        if(this.props.rehydrated === true) {
            this.checkUserLogin()
                .then(status => {
                    if (status)
                        Actions.reset('root');
                    else
                        Actions.reset('auth');
                })
                .catch(e => {
                    console.log(e);
                })
        }
        return (
            <SplashScreen/>
        );
    }

    async checkUserLogin() {
        try {
            let apiToken = this.props.apiToken;
            return apiToken === null
                ? false
                : await this.checkUserLoginFromApi(apiToken);
        } catch (e) {
            console.log(e)
        }
    }
}

export default Splash;

const Styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 20, paddingLeft: 20, backgroundColor: '#FFBE00'},
    loginTitle: {
        textAlign: 'center',
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
    mainText: {
        color: '#FFF',
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
    inputs: {
        textAlign: 'right',
        marginRight: 10,
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
    inputIcons: {color: '#3e3e3e'},
    grid: {marginTop: 10},
    registerBtn: {marginRight: 5, marginLeft: 12},
    loginBtn: {marginLeft: 5},
    btnText: {
        fontSize: 14,
        marginTop: 8,
        ...Platform.select({
            ios: {
                fontFamily: 'IRANSansMobile',
                fontWeight: 'bold'
            },
            android: {
                fontFamily: 'IRANSansMobile_Bold'
            }
        })
    }
});
