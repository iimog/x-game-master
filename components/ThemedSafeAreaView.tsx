import React from 'react';
import { withStyles } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

const StyledSafeAreaView = (props: any) => {
  const { eva, style, ...restProps } = props;
    
  return (
    <SafeAreaView {...restProps} style={[eva.style.view, style]} />
  );
};

export const ThemedSafeAreaView = withStyles(StyledSafeAreaView, (theme) => ({
  view: {
    backgroundColor: theme['background-basic-color-1'],
    flex: 1,
  },
}));