import { View, Image, Text } from 'react-native' 
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer' 
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
import { useRouter } from 'expo-router'

export default function DrawerContent(props) {

    const router = useRouter();
    const year = new Date().getFullYear();  

    const handleLogout = async () => {
        router.replace('/');
    }

    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                scrollEnabled={true}
                contentContainerStyle={{ paddingTop: top }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 20 + top,
                        paddingBottom: 20
                    }}
                > 
                    
                </View>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name='logout' color={color} size={size} />
                    )}
                    labelStyle={{ marginLeft: 10 }}
                    onPress={handleLogout}
                />
            </DrawerContentScrollView>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 20 + bottom
                }}
            >
                <Text>
                    Copyright &copy; {year}. All rights reserved
                </Text>
            </View> 
        </View>
    )
}