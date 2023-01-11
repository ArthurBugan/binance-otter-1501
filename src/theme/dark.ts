import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h6: {
      '&.positive': {
        color: 'rgb(14, 203, 129)'
      },
      '&.negative': {
        color: 'rgb(246, 70, 93)'
      },
      marginRight: '.5rem'
    },
    caption: {
      marginLeft: '.5rem',
      color: 'rgb(234, 236, 239)'
    }
  },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'rgb(234, 236, 239)'
        }
      }
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'rgb(240, 185, 11)'

          }
        }
      }
    },

    MuiLink: {
      styleOverrides: {
        root: {
          '&.ml-auto': {
            marginLeft: 'auto',
            textDecoration: 'none'
          }
        }
      }
    },

    MuiTableCell: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'body' ?
            {
              '&.bids': {
                color: 'rgb(246, 70, 93)'
              },
              '&.asks': {
                color: 'rgb(14, 203, 129)'
              },
              fontSize: '12px',
              flex: '1 1 0%',
              textAlign: 'left',
              lineHeight: '0.10',
            } : {
              fontSize: '12px',
              color: 'rgb(132, 142, 156)',
              "&:last-child > div": {
                justifyContent: 'flex-end'
              },
            }),
          borderBottom: "none",
          fontWeight: '400',
        }),
      },
    },
  },
});

export default theme;