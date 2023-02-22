import { Index } from '../Index';
import { createContext, useState } from 'react';
import { local } from '@toolz/local-storage';
import { algorithm as algorithms } from '../../../common/objects/algorithm';
import { useStateWithCallback } from '../../../common/hooks/useStateWithCallback';

export const IndexState = createContext({});

export const getPaletteArray = () => {
   const paletteList = getPaletteList();
   return paletteList === '' ? [] : paletteList.split(',');
}

export const getPaletteList = () => {
   const translation = {
      basePaints: 'Heavy Body Acrylics',
      quarterWhites: '1/4 Whites',
      thirdWhites: '1/3 Whites',
      halfWhites: '1/2 Whites',
      twoThirdWhites: '2/3 Whites',
      threeQuarterWhites: '3/4 Whites',
   }
   const palettes = local.getItem('palettes', {
      basePaints: true,
      quarterWhites: false,
      thirdWhites: false,
      halfWhites: false,
      twoThirdWhites: false,
      threeQuarterWhites: false,
   });
   let paletteList = [];
   Object.entries(palettes).forEach(entry => {
      const [key, isUsed] = entry;
      if (!isUsed)
         return;
      paletteList.push(translation[key]);
   });
   return paletteList.join(',');
}

export const IndexContainer = () => {
   const [algorithm, setAlgorithm] = useStateWithCallback(local.getItem('algorithm', algorithms.RGB));
   const [blockSize, setBlockSize] = useStateWithCallback(local.getItem('blockSize', 10));
   const [colorOrGreyscale, setColorOrGreyscale] = useStateWithCallback(local.getItem('colorOrGreyscale', 'color'));
   const [matchToPalette, setMatchToPalette] = useStateWithCallback(local.getItem('matchToPalette', false));
   const [maximumColors, setMaximumColors] = useStateWithCallback(local.getItem('maximumColors', 0));
   const [minimumThreshold, setMinimumThreshold] = useStateWithCallback(local.getItem('minimumThreshold', 5));
   const [paletteList, setPaletteList] = useState(getPaletteList());
   const [paletteArray, setPaletteArray] = useState(getPaletteArray());
   const [palettes, setPalettes] = useStateWithCallback(local.getItem('palettes') || {});
   const [progress, setProgress] = useState([0]);
   const [showProcessing, setShowProcessing] = useState(false);

   return <>
      <IndexState.Provider value={{
         algorithm,
         blockSize,
         colorOrGreyscale,
         matchToPalette,
         maximumColors,
         minimumThreshold,
         paletteArray,
         paletteList,
         palettes,
         progress,
         setAlgorithm,
         setBlockSize,
         setColorOrGreyscale,
         setMatchToPalette,
         setMaximumColors,
         setMinimumThreshold,
         setPaletteArray,
         setPaletteList,
         setPalettes,
         setProgress,
         setShowProcessing,
         showProcessing,
      }}>
         <Index progress={progress[0]}/>
      </IndexState.Provider>
   </>
}
