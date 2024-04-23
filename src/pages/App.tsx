import { createContext, useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '../routes/index';

import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const routing = useRoutes(routes);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>{routing}</ThemeProvider>
        </ColorModeContext.Provider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
