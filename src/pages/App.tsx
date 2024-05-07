import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '../routes/index';
import globalStore from '@states/global';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const routing = useRoutes(routes);

  const themeMode = globalStore(state => state.themeMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: '#3EE19E',
            contrastText: '#fff',
          },
          secondary: {
            main: '#8BFBA7',
            contrastText: '#000',
          },
        },
      }),
    [themeMode],
  );

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{routing}</ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
