import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
    TextInput,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../../const/colors';
import * as Animatable from 'react-native-animatable';
import {GradientButton} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import pets from '../../const/pets';
import {db, auth} from '../../../firebase';
import {collection, getDocs, getDoc, doc, updateDoc} from 'firebase/firestore';
import {Card} from '../../components';
import { ActivityIndicator } from 'react-native-paper';
import {Loading} from '../../components';

const {height} = Dimensions.get('window');

const FavoriteScreen = ({navigation, route}) => {
    const [userFavor, setUserFavor] = useState([]);
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    const getPets = async () => {
        setIsLoading(true)
        const user = auth.currentUser;
        const userDocRef = doc(db, 'users', user.uid);
        let docSnap = await getDoc(userDocRef);
        const favorList = docSnap.data().favoritepets;
        setUserFavor(favorList);
        
        const petsRef = collection(db, 'pets');
        const pets = await getDocs(petsRef)
                
        try {
            let list = []
            
            pets.forEach(async document => {
                if (favorList.indexOf(document.id) <= -1) return 
                const {
                    age,
                    category,
                    description,
                    gender,
                    imageurl,
                    name,
                    ownerID,
                    type,
                } = document.data();


                list.push({
                    id: document.id,
                    age,
                    category,
                    description,
                    gender,
                    imageurl,
                    name,
                    ownerID,
                    type,
                });
            });
            
            setPets(list);
            setIsLoading(false)
        } catch (e) {
            console.log(e);
            setIsLoading(false)
        }
    };

    useEffect(() => {
        getPets()
    }, []);

    if (isLoading) return (
        <View style={{width: '100%', height: '100%', justifyContent: 'center'}}>
            <ActivityIndicator/>
        </View>
    )
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backArrow}
                    onPress={() => navigation.goBack('HomeScreen')}
                >
                    <Icon name="arrow-left" size={30} />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Your favorite</Text>
                </View>
            </View>
            <StatusBar backgroundColor={'#e6acfa'} barStyle="light-content" />

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                nestedScrollEnabled={true}
            >
                <View style={styles.listContainer}>
                    <View style={{marginTop: 20}}>
                        {pets.map((item, index) => (
                            <Card
                                key={index}
                                pet={item}
                                navigation={navigation}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 25,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#e6acfa',
    },
    backArrow: {
        marginLeft: 10,
    },
    title: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleText: {fontSize: 30, marginRight: 40, fontWeight: 'bold'},
    listContainer: {
        flex: 1,
        backgroundColor: '#f3cffc',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
        minHeight: height,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardDetailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: 'center',
    },
    cardImageContainer: {
        height: 150,
        width: 140,
        backgroundColor: COLORS.background,
        borderRadius: 20,
    },
    iconCon: {
        backgroundColor: COLORS.primary,
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
});
