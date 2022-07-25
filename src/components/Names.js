import React, { useEffect } from 'react'
import { Text } from '@react-three/drei'
import {getNames} from '../assets/js/near/utils'


export function Names({useNamesArray}) {

  const namesArray = useNamesArray((state) => state.namesArray)
  const setNamesArray = useNamesArray((state) => state.setNamesArray)

  useEffect(() => {
    getNames()
      .then(names => {
        setNamesArray(names)
      });
  },
    [setNamesArray])

  const randomBetween = (min, max) => {
    return min + (max - min) * Math.random();
  };

  const randomOption = (options) => {
    return options[Math.floor(Math.random() * options.length)];
  };
  
  const fontArray = ['/assets/DK Midnight Chalker.otf', '/assets/Chalky Chicken.ttf', 'assets/Rhodyn Chalk.ttf', 'assets/HyningsHandwritingV2-Regular.ttf', 'assets/Handwriting.ttf']

  return (
    <>
      {namesArray.map((name, i) => {
        return (
          <Text key={i}
            position={[randomBetween(-.4, .4),randomBetween(-.06, .22),0.0051]}
            fontSize={.012}
            textAlign={'center'}
            font={randomOption(fontArray)}
            color={name.color}
          >
            {`${name.text} \nwas here`}
          </Text>
        )
      })}
    </>
  )

}