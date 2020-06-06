import {
  Box,
  Button,
  CardContent,
  CardHeader,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useReducer, useState } from 'react';

import { Algorithm } from 'src/common/cube';

export type State = {
  trainerState: 'initial' | 'in between tests' | 'during test';
  currentAlg: Algorithm;
};
type Action =
  | {
      type: 'start training';
    }
  | {
      type: 'next test';
      payload: { nextAlg: Algorithm };
    }
  | {
      type: 'finish test';
    };
const defaultInitialState: State = {
  trainerState: 'initial',
  currentAlg: new Algorithm(),
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start training': {
      return { ...state, trainerState: 'in between tests' };
    }
    case 'next test': {
      return {
        ...state,
        trainerState: 'during test',
        currentAlg: action.payload.nextAlg,
      };
    }
    case 'finish test': {
      return { ...state, trainerState: 'in between tests' };
    }
    default:
      throw new Error();
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nullFunction = (): void => {};
export const PLLTrainer: React.FC<{
  initialState?: State;
  algs: Algorithm[];
}> = ({ initialState = defaultInitialState, algs }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const startTraining = useCallback(
    () => dispatch({ type: 'start training' }),
    [],
  );
  switch (state.trainerState) {
    case 'initial': {
      document.body.onkeydown = nullFunction;
      return <PLLTrainerInitial startTraining={startTraining} />;
    }
    case 'in between tests': {
      document.body.onkeydown = (e): void => {
        e.code === 'Space' &&
          dispatch({ type: 'next test', payload: { nextAlg: algs[0] } });
      };
      return <PLLTrainerInBetweenTests />;
    }
    case 'during test': {
      document.body.onkeydown = (e): void => {
        e.code === 'Space' && dispatch({ type: 'finish test' });
      };
      return <PLLTrainerDuringTests algBeingTested={state.currentAlg} />;
    }
    default: {
      throw new Error(`Unexpected default for ${state.trainerState}`);
    }
  }
};

const PLLTrainerInitial: React.FC<{ startTraining: () => void }> = ({
  startTraining,
}) => {
  return (
    <PllTrainerPaper>
      <Button onClick={startTraining} variant="contained" color="primary">
        Start
      </Button>
    </PllTrainerPaper>
  );
};

const PLLTrainerInBetweenTests: React.FC = () => {
  return (
    <PllTrainerPaper>
      {/* <Typography align="center" component="h2" variant="h4">
        0.00
      </Typography> */}
      <LLCube movesFromSolved={new Algorithm()}></LLCube>
      <Typography align="center" component="h2" variant="h5">
        Press Space To Begin
      </Typography>
    </PllTrainerPaper>
  );
};

const PLLTrainerDuringTests: React.FC<{ algBeingTested: Algorithm }> = ({
  algBeingTested,
}) => {
  return (
    <PllTrainerPaper>
      <LLCube movesFromSolved={algBeingTested.getInverse()} />
      <Typography align="center" component="h2" variant="h5">
        Press Space To End
      </Typography>
    </PllTrainerPaper>
  );
};

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

type LLCubeProps = {
  movesFromSolved: Algorithm;
};

const PRIMARY_VISUAL_CUBE_HOST = 'cube.crider.co.uk';
const BACKUP_VISUAL_CUBE_HOST = '178.62.114.213';

const LLCube: React.FC<LLCubeProps> = ({ movesFromSolved }) => {
  const [visualCubeHost, setVisualCubeHost] = useState(
    PRIMARY_VISUAL_CUBE_HOST,
  );
  const useBackupVisualCubeHost = useCallback(
    () => setVisualCubeHost(BACKUP_VISUAL_CUBE_HOST),
    [],
  );
  const baseUrl = `http://${visualCubeHost}/visualcube.php?fmt=png&bg=t&sch=wrgyob&size=150&stage=ll&alg=`;
  return (
    <img
      onError={useBackupVisualCubeHost}
      src={baseUrl + movesFromSolved.toString()}
      alt="Cube displaying PLL case"
    />
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
