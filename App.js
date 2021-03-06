import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from '@faker-js/faker'

faker.seed(10);
const DATA = [...Array(60).keys()].map((_, i) => {

    return {
        key: faker.datatype.number(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement(['women', 'men'])}/${faker.datatype.number(60)}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});

const BG_IMG = 'https://previews.123rf.com/images/artlana/artlana1205/artlana120500007/13612471-palmera-con-un-dise%C3%B1o-de-onda-de-flores-en-color-rosa.jpg'
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

export default () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        // blurRadius={70}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset : {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        keyExtractor={items => items.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42
        }}
        renderItem={({item, index}) => {
            const inputRange = [
              -1,
               0,
               ITEM_SIZE * index,
               ITEM_SIZE * (index + 2)
            ]
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0]
            })
            const opacityInputRange = [
              -1,
               0,
               ITEM_SIZE * index,
               ITEM_SIZE * (index + 1)
            ]
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0]
            })

          return <Animated.View style={{flexDirection:'row', padding: SPACING, marginBottom: SPACING, 
              backgroundColor:'rgba(0,0,0,0.7)', borderRadius:12,
              shadowColor: "#000", 
              shadowOffset:{
                width: 0, 
                height: 10
                }, 
                shadowOpacity: .4, 
                shadowRadius: 20,
                opacity,
                transform:[{scale}]
                }}>
            <Image source={{uri: item.image}} style={{width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE, marginRight:SPACING / 2}}/>
            <View>
              <Text style={{fontSize:22, fontWeight:'700', color:"#fff"}}>{item.name}</Text>
              <Text style={{fontSize: 18, opacity:.7, color:"#fff"}}>{item.jobTitle}</Text>
              <Text style={{fontSize:14, opacity: 0.9, color:'#0099CC'}}>{item.email}</Text>
            </View>
          </Animated.View>
        }}
      />
    </View>
}