import {
  Box,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';

export const PllTrainer: React.FC = () => (
  <Paper elevation={3}>
    <Box borderBottom={1}>
      <CardHeader
        title="PLL Trainer"
        titleTypographyProps={{ align: 'center', component: 'h1' }}
      />
    </Box>
    <CardContent>
      <TimerDisplay time="0.000" />
      <PLLCube algorithm="M2 U M2 U2 M2 U M2" />
    </CardContent>
  </Paper>
);

// type State = { startTime: number | null };
// type Action = {
//   type: 'start';
//   payload: { currentTime: number };
// };

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case 'start': {
//       return { startTime: action.payload.currentTime };
//     }
//     default:
//       throw new Error();
//   }
// }

// const Timer: React.FC = () => {
//   const [state, dispatch] = useReducer(reducer, { startTime: null });
// };

type TimerDisplayProps = {
  time: string;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => (
  <Typography variant="h6" component="span">
    {time}
  </Typography>
);

type PLLCubeProps = {
  algorithm: string;
};

const PRIMARY_VISUAL_CUBE_HOST = 'cube.crider.co.uk';
const BACKUP_VISUAL_CUBE_HOST = '178.62.114.213';

const PLLCube: React.FC<PLLCubeProps> = ({ algorithm }) => {
  const [visualCubeHost, setVisualCubeHost] = useState(
    PRIMARY_VISUAL_CUBE_HOST,
  );
  const useBackupVisualCubeHost = useCallback(
    () => setVisualCubeHost(BACKUP_VISUAL_CUBE_HOST),
    [],
  );
  const urlFriendlyAlg = removeSpaces(algorithm);
  const baseUrl = `http://${visualCubeHost}/visualcube.php?fmt=png&bg=t&sch=wrgyob&size=150&stage=ll&alg=`;
  return (
    <img
      onError={useBackupVisualCubeHost}
      src={baseUrl + urlFriendlyAlg}
      alt="Cube displaying PLL case"
    />
  );
};

function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '');
}
