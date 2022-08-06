import { Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

export const CustomButton = (props: any) => {
  return (
    <Button
      style={{margin: '3%', alignSelf: 'center', alignItems: 'center'}}
      color="cornflowerblue"
      mode="contained"
      onPress={props.onPress}
      disabled={props.isDisabled}>
      <Text>{props.title}</Text>
    </Button>
  );
};
