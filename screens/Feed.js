import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, StatusBar, SafeAreaView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import PostCard from './PostCard';

export default class Feed extends React.Component {
    constructor(){
        super();
        this.state = {
            light_theme: false,
            posts: []
        }
    }

    fetchPosts = () => {
        firebase
            .database()
            .ref("/post/")
            .on("value", (snapshot) => {
                let posts = [];

                if(snapshot.val()){
                    Object.keys(snapshot.val()).forEach(function(key){
                        posts.push({key: key, value: snapshot.val()[key]})
                    });
                }
                this.setState({
                    posts: posts
                });

                this.props.setUpdateToFalse;
            }, function(errorObject){
                console.log("Read Failed" + errorObject.code);
            })
    }

    renderItem = ({ item: post }) => {
        return (
            <View style={styles.cardContainer}>
                <PostCard post={post} navigation={this.props.navigation} />
            </View>
        );
    }

    keyExtractor = (item, index) => index.toString();

    componentDidMount(){
        this.fetchPosts();

        let theme;

        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function(snapshot){
                theme = snapshot.val().current_theme;
            })
        this.setState({
            light_theme: theme ? true : false
        });
    }

    render(){
        return (
            <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/logo.png')}
                        />
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>
                            Spectagram
                        </Text>
                    </View>
                </View>
                {
                    this.state.posts[0]
                        ?
                        <View style={styles.noPosts}>
                            <Text style={this.state.light_theme ? styles.noPostsTextLight : styles.noPostsText}>
                                No Posts Available
                            </Text>
                        </View>
                        :
                        <View style={styles.cardContainer}>
                            <FlatList
                                data={posts}
                                renderItem={this.renderItem}
                                keyExtractor = {this.keyExtractor}
                            />
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    appTitle: {
        marginTop: 20,
        flex: 0.07,
        flexDirection: 'row'
    },
    appIcon: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: 'center'
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(30)
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(30)
    },
    noPosts: {
        flex: 0.85,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noPostsText: {
        fontSize: RFValue(40),
        fontFamily: "Bubblegum-Sans",
        color: "white"
    },
    noPostsTextLight: {
        fontSize: RFValue(40),
        fontFamily: "Bubblegum-Sans",
        color: "black"
    },
    cardContainer: {
        flex: 0.25
    }
});