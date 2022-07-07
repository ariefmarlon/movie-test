import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

export default function App(props) {
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            let response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=065ffbcf2742d39e453500abc886db7b&language=en-US&page=1');
            let json = await response.json();
            setData(json.results);
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const renderItem = ({item}) => {
        return (
            <View style={{
                borderWidth: 1, 
                borderColor: 'grey', 
                paddingVertical: 10, 
                padding: 5, 
                marginVertical: 13,
                borderRadius: 10,
                margin: 6
                }}>
                <View>
                    <TouchableOpacity>
                        <Image style={{ width: "100%", height: 350, borderRadius: 5}}
                            source={{ uri: "https://image.tmdb.org/t/p/original/" + item.backdrop_path }}
                        />
                    </TouchableOpacity>

                    <View>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 'bold'
                            }}>{item.title}
                        </Text>

                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                            }}>{item.release_date}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});