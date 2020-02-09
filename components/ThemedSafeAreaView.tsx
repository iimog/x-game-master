import React from 'react';
import { withStyles } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledSafeAreaView = (props) => {
  const { themedStyle, style, ...restProps } = props;
    
  return (
    <SafeAreaView {...restProps} style={[themedStyle.view, style]} />
  );
};

export const ThemedSafeAreaView = withStyles(StyledSafeAreaView, (theme) => ({
  view: {
    backgroundColor: theme['background-basic-color-1'],
    flex: 1,
  },
}));