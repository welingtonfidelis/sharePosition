import React from 'react';
import { 
    Share, View, Text, StyleSheet, TouchableOpacity 
} from 'react-native';

const ShareExample = ({ message }) => {
    const onShare = async () => {
        try {
            const result = await Share.share({ message });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <View style={{ marginTop: 50 }}>
            <TouchableOpacity onPress={onShare}>
                <View style={styles.buttonShare} >
                    <Text>COMPARTILHAR</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonShare: {
        marginBottom: 30,
        backgroundColor: '#0C8DF6',
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
});

export default ShareExample;
