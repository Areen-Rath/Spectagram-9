import * as React from 'react';
import { Text, View, TextInput, StyleSheet, Image, ScrollView, StatusBar, SafeAreaView, Platform, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

export default class CreatePost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            previewImage: "image_1",
            dropdownHeight: 40,
            light_theme: false,
            profile_image: ''
        }
    }

    addPost(){
        if(this.state.caption){
            let postData = {
                preview_image: this.state.previewImage,
                caption: this.state.caption,
                author: firebase.auth().currentUser.displayName,
                created_on: new Date(),
                author_uid: firebase.auth().currentUser.uid,
                profile_image: this.state.profile_image,
                likes: 0
            }

            await firebase
                .databse()
                .ref("/post/" + Math.random().toString(36).slice(2))
                .set(postData)
                .then(function(snapshot){})
            
            this.props.navigation.navigate("Feed");

            this.props.setUpdateToTrue;
        } else {
            Alert.alert(
                "Error",
                "Enter caption.",
                [{text: "OK", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            );
        }
    }

    componentDidMount(){
        let theme, image;

        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function(snapshot){
                theme = snapshot.val().current_theme;
                image = snapshot.val().profile_picture;
            })
        this.setState({
            light_theme: theme ? true : false,
            profile_image: image
        });
    }

    render(){
        let preview_images = {
            "image_1": require('../assets/image_1.jpg'),
            "image_2": require('../assets/image_2.jpg'),
            "image_3": require('../assets/image_3.jpg'),
            "image_4": require('../assets/image_4.jpg'),
            "image_5": require('../assets/image_5.jpg'),
            "image_6": require('../assets/image_6.jpg'),
            "image_7": require('../assets/image_7.jpg')
        }
        return (
            <View style={this.state.light_theme ? styles.container : styles.containerLight}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/logo.png')}
                        />
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme ? styles.appTitleText : styles.appTitleTextLight}>New Post</Text>
                    </View>
                </View>
                <View style={styles.fieldsContainer}>
                    <ScrollView>
                        <Image
                            style={styles.previewImage}
                            source={preview_images[this.state.previewImage]}
                        />   
                        <View style={{height: RFValue(this.state.dropdownHeight)}}>
                            <DropDownPicker
                                items={[
                                    {label: "Image 1", value: "image_1"},
                                    {label: "Image 2", value: "image_2"},
                                    {label: "Image 3", value: "image_3"},
                                    {label: "Image 4", value: "image_4"},
                                    {label: "Image 5", value: "image_5"},
                                    {label: "Image 6", value: "image_6"},
                                    {label: "Image 7", value: "image_7"}
                                ]}
                                defaultValue={this.state.previewImage}
                                containerStyle={{height: 40, borderRadius: 20, marginBottom: 10}}
                                onOpen={() => {this.setState({dropdownHeight: 170})}}
                                onClose={() => {this.setState({dropdownHeight: 40})}}
                                style={{backgroundColor: "transparent"}}
                                itemStyle={{justifyContent: 'flex-start'}}
                                dropDownStyle={this.state.light_theme ? {backgroundColor: "black"} : {backgroundColor: "white"}}
                                labelStyle={this.state.light_theme ? {color: "white"} : {color: "black"}}
                                arrowStyle={this.state.light_theme ? {color: "white"} : {color: "black"}}
                                onChangeItem={item => this.setState({previewImage: item.value})}
                            />
                        </View>
                        <TextInput
                            style={this.state.light_theme ? styles.inputFont : styles.inputFontLight}
                            onChangeText={caption => this.setState({caption})}
                            placeholder={"Title"}
                            placeholderTextColor="white"
                        />
                    </ScrollView>
                </View>
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
    fieldsContainer: {
        flex: 0.85
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: 'center',
        resizeMode: "contain",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10)
    },
    inputFont: {
        height: RFValue(40),
        color: "white",
        paddingLeft: RFValue(10),
        borderColor: "white",
        borderRadius: RFValue(10),
        borderWidth: RFValue(1)
    },
    inputFont: {
        height: RFValue(40),
        color: "black",
        paddingLeft: RFValue(10),
        borderColor: "black",
        borderRadius: RFValue(10),
        borderWidth: RFValue(1)
    }
});