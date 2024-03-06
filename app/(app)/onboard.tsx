import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Container } from '@/components/Ui/Container';
import { MyText } from '@/components/Ui/MyText';
import { colors } from '@/constants/Colors';
import { HStack } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

const onBoardData = [
  {
    heading: 'Welcome to 247Doc',
    subText:
      'Africa’s Premier Virtual Consultation Service, in collaboration with 247pharmacy.net and 247Laboratory.net',
    imgUrl: require('../../assets/images/onboard-three.png'),
  },
  {
    heading: 'Get in touch any time',
    subText:
      'We are available to speak with you ANYWHERE, ANYTIME, ALL YEAR ROUND',
    imgUrl: require('../../assets/images/onboard-two.png'),
  },
  {
    heading: 'Trusted Team',
    subText:
      'Our team of fully qualified and trusted Doctors, Pharmacists, Alternative Healthcare Practitioners and Mental Health Specialists are available to provide video consultations anywhere, anytime.',
    imgUrl: require('../../assets/images/onboard-one.png'),
  },
];

const Onboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = onBoardData[currentIndex];
  return (
    <Container>
      <View style={styles.imgContainer}>
        <Image source={data.imgUrl} style={styles.img} />
      </View>

      <View style={styles.textContainer}>
        <MyText style={styles.headingText} text={data.heading} />

        <MyText style={styles.subText} text={data.subText} />
      </View>

      <HStack mt={20}>
        <Link href={'/(app)/(tabs)/'}>
          <MyText text="Skip" style={styles.skip} />
        </Link>
      </HStack>
    </Container>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  imgContainer: {
    width: '100%',
    height: '60%',
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%' },
  textContainer: {
    marginTop: 20,
    gap: 20,
  },
  headingText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    color: 'black',
  },

  subText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    color: colors.textLight,
  },
  skip: {
    color: colors.textBlue,
    fontSize: 12,
    fontFamily: 'PoppinsMedium',
  },
});
