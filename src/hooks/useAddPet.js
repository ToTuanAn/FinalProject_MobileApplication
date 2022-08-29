import {useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {collection, addDoc, setDoc, doc} from 'firebase/firestore';
import uuid from 'react-native-uuid';
import {db, auth} from '../../firebase';

export const useAddPet = () => {
    const [addPetPublishing, setAddPetPublishing] = useState(false);
    const [petImg, setPetImg] = useState('');
    const {handleSubmit, control} = useForm();

    const onSubmit = data => {
        var key = uuid.v4();

        const userId = auth.currentUser.uid;
        const age = parseInt(data.age, 10);

        if (!userId || !age) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('Add pet failed', ToastAndroid.SHORT);
            }
            return;
        }

        setAddPetPublishing(true);

        const petData = {
            ...data,
            imageurl: petImg,
            ownerID: userId,
            category: data.category,
            gender: data.gender == 'female',
            age,
        };

        console.log('pet data: ', petData);

        const newPetsRef = collection(db, 'pets');
        const newPet = doc(newPetsRef, key);

        setDoc(newPet, petData).then(() => {
            setAddPetPublishing(false);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Add pet successfully', ToastAndroid.SHORT);
            }
        });
    };

    return {
        setPetImg,
        addPetPublishing,
        control,
        handleAddPetFormSubmit: handleSubmit(onSubmit),
    };
};
