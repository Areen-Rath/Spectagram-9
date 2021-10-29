import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class PostCard extends React.Component {
    constructor(){
        super();
        this.state = {
            light_theme: false,
            post_id: this.props.post.key,
            post_data: this.props.post.value
        }
    }

    componentDidMount(){
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
        let post = this.state.post_data;
        let images = {
            "image_1": require('../assets/image_1.jpg'),
            "image_2": require('../assets/image_2.jpg'),
            "image_3": require('../assets/image_3.jpg'),
            "image_4": require('../assets/image_4.jpg'),
            "image_5": require('../assets/image_5.jpg'),
            "image_6": require('../assets/image_6.jpg'),
            "image_7": require('../assets/image_7.jpg')
        }
        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={() => this.props.navigation.navigate("Post"), {post: this.props.post}}
            >
                <View style={this.state.light_theme ? styles.cardContainerLight : styles.cardContainer}>
                    <View style={styles.authorContainer}>
                        <View style={styles.authorImageContainer}>
                            <Image
                                style={{width: 30, height: 30, borderRadius: 50}}
                                source={images[post.preview_image]}
                            />
                        </View>
                        <View style={styles.authorNameContainer}>
                            <Text style={this.state.light_theme ? styles.authorNameTextLight : styles.authorNameText}>{this.props.post.author}</Text>
                        </View>
                    </View>
                    <Image
                        style={styles.postImage}
                        source={require('../assets/post.jpeg')}
                    />
                    <View style={styles.captionContainer}>
                        <Text style={this.state.light_theme ? styles.captionLight : styles.caption}>{this.props.post.caption}</Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                            <Ionicons name="heart" size={RFValue(30)} color="white" />
                            <Text style={styles.likeText}>12k</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        marginLeft: RFValue(15),
        marginRight: RFValue(15),
        marginBottom: RFValue(60),
        backgroundColor: "grey",
        borderRadius: RFValue(20)
    },
    cardContainerLight: {
        marginLeft: RFValue(15),
        marginRight: RFValue(15),
        marginBottom: RFValue(60),
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: RFValue(20)
    },
    authorContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    authorImageContainer: {
        margin: RFValue(10)
    },
    authorNameContainer: {
        margin: RFValue(10)
    },
    authorNameText: {
        fontSize: 15,
        color: "white"
    },
    authorNameTextLight: {
        fontSize: 15,
        color: "black"
    },
    postImage: {
        width: "95%",
        height: RFValue(250),
        alignSelf: 'center',
        resizeMode: "contain"
    },
    captionContainer: {
        margin: RFValue(10)
    },
    caption: {
        fontSize: 15,
        color: "white"
    },
    captionLight: {
        fontSize: 15,
        color: "black"
    },
    actionContainer: {
        padding: RFValue(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "pink",
        borderRadius: RFValue(30)
    },
    likeText: {
        marginLeft: RFValue(5),
        fontSize: RFValue(25),
        color: "white"
    }
});