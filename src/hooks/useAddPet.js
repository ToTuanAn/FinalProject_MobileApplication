import { useMemo, useRef, useState } from 'react';
// import { useQueryClient } from 'react-query';
// import { PlaceChestInput, ChestService } from '../services/chestService';
// import Quill from 'quill';
// import { useToast } from '@chakra-ui/react';
// import { ModalsController } from '../utils/modalsController';
// import { CREATE_POST_REDIRECT } from '../constants';
// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';

import {useForm, Controller} from 'react-hook-form';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
// import {uuid} from 'uuidv4';
import {db} from '../../firebase';

export const useAddPet = () => {
    // const queryClient = useQueryClient();
    const [addPetPublishing, setAddPetPublishing] = useState(false);
    const [petImg, setPetImg] = useState("");
    // const toast = useToast();
    // const router = useRouter();
    // const dispatch = useDispatch();

    const { handleSubmit, control } = useForm();

    const onSubmit = data => {
        console.log("data", data)
        var key= "hello world"
    
        const petData = {
            ...data,
            id: key,
            image: petImg
        } 

        setAddPetPublishing(true)

        const newPetsRef = collection(db, "pets");
        const newPet = doc(newPetsRef, key);
        
        setDoc(newPet, petData).then(()=>{
            setAddPetPublishing(false);
        })
          
    }

    return {
        // refQuill,
        // placeChestForm,
        setPetImg,
        addPetPublishing,
        control,
        handleAddPetFormSubmit: handleSubmit(onSubmit),
    };
};

