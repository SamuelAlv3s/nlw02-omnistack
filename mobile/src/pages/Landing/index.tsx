import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyIcons from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';
import api from '../../services/api';

function Landing(){

    const { navigate } = useNavigation();

    function handleNavigationToGiveClassesPage(){
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPages(){
       navigate('Study');
    }

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const {total} = response.data;

            setTotalConnections(total);
        })
    }, []);
    
    return(
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImg}/>

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton  onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcons}/>
                    <Text style={styles.buttonText}>
                        Estudar
                    </Text>
                </RectButton>

                <RectButton  
                onPress={handleNavigationToGiveClassesPage} 
                style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>
                    <Text style={styles.buttonText}>
                        Dar aulas
                    </Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;