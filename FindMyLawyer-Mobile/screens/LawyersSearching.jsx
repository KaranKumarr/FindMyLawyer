import { SafeAreaView, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import Heading from '../components/Base/Heading';
import AuthContext from '../context/AuthProvider';
import LawyerCard from '../components/Other/LawyerCard';
import axios from '../api/axios';

const SEARCH_LAWYERS_URL = '/lawyers/search/';
const LawyersSearching = ({ navigation, route }) => {

  const { auth } = React.useContext(AuthContext);

  const [searchInput, setSearchInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState(route.params.searchQuery);
  const [lawyers, setLawyers] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {

        const { data } = await axios.get(SEARCH_LAWYERS_URL + searchQuery, {});

        setLawyers(data.lawyers);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth.token, searchQuery]);

  return (
    <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>
      <ScrollView>
        {/* Search */}
        <View className='bg-neutral-contrast/10 rounded-md p-2.5 my-2.5 mx-5 flex-row'>
          <TextInput
            onChangeText={(newText) => { setSearchInput(newText); }}
            className='flex-1 text-base font-semibold pr-2.5'
            placeholder='Find your desired lawyers' />
          <TouchableOpacity
            onPress={() => { setSearchQuery(searchInput); }}
          >
            <Ionicons
              size={24}
              name='search'
              color={'#353935'}
            />
          </TouchableOpacity>
        </View>

        <Heading classNames={'px-5'} size={5}>
          Search results for "<Heading size={5} classNames={'text-primary'}>{searchQuery}</Heading>
          "
        </Heading>

        <View className='p-5'>
          <FlatList
            numColumns={2}
            data={lawyers}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item, index }) => (<View
              style={{
                flex: 1, marginRight: index % 2 !== 0 ? 0 : 5, marginBottom: 10,
                marginLeft: index % 2 !== 0 ? 5 : 5,
                position: "relative",
              }}
            >
              <LawyerCard navigation={navigation} lawyer={item} />
            </View>)}
          />
        </View>

      </ScrollView>
    </SafeAreaView>

  );
};

export default LawyersSearching;