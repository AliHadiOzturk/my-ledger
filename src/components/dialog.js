import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

export default CustomDialog = ({ children, visible, title, actions, onDismiss }) => {
    // const [visible, setVisible] = React.useState(false);

    // const showDialog = () => setVisible(true);

    // const hideDialog = () => setVisible(false);

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={onDismiss}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Content>
                        {children}
                    </Dialog.Content>
                    <Dialog.Actions>
                        {actions}
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}