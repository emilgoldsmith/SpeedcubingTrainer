import {
  Box,
  Button,
  CardContent,
  CardHeader,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';

type LLCubeProps = {
  algorithm: string;
};

const PRIMARY_VISUAL_CUBE_HOST = 'cube.crider.co.uk';
const BACKUP_VISUAL_CUBE_HOST = '178.62.114.213';

const LLCube: React.FC<LLCubeProps> = ({ algorithm }) => {
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

const useStyles = makeStyles({
  cardContainer: {
    '& > *': {
      margin: 'auto',
      textAlign: 'center',
      display: 'block',
      '&:not(:last-child)': {
        marginBottom: '20px',
      },
    },
  },
});

export const PLLTrainer: React.FC = () => {
  return (
    <PllTrainerPaper>
      <Button variant="contained" color="primary">
        Start
      </Button>
    </PllTrainerPaper>
  );
};

export const PLLTrainerAfterStart: React.FC = () => {
  return (
    <PllTrainerPaper>
      <Typography align="center" component="h2" variant="h4">
        0.00
      </Typography>
      <LLCube algorithm=""></LLCube>
      <Typography align="center" component="h2" variant="h5">
        Press Space To Begin
      </Typography>
    </PllTrainerPaper>
  );
};

const PllTrainerPaper: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper elevation={3}>
      <Box borderBottom={1}>
        <CardHeader
          title="PLL Trainer"
          titleTypographyProps={{ align: 'center', component: 'h1' }}
        />
      </Box>
      <CardContent className={classes.cardContainer}>{children}</CardContent>
    </Paper>
  );
};

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

// type TimerDisplayProps = {
//   time: string;
// };

// const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => (
//   <Typography variant="h6" component="span">
//     {time}
//   </Typography>
// );
