const style = {
    appBar: {
      backgroundColor: '#EDF2F7',
    },
    logo: {
      display: { xs: 'none', md: 'flex' },
      mr: 1,
      color: 'blue',
    },
    title: {
      mr: 2,
      display: { xs: 'none', md: 'flex' },
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'black',
      textDecoration: 'none',
    },
    box: {
      flexGrow: 1,
      display: { xs: 'flex', md: 'none' },
    },
    menu: {
      display: { xs: 'block', md: 'none' },
    },
    link: {
      textDecoration: 'none',
    },
    logoSmall: {
      display: { xs: 'flex', md: 'none' },
      mr: 1,
      color: 'blue',
    },
    titleSmall: {
      mr: 2,
      display: { xs: 'flex', md: 'none' },
      flexGrow: 1,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'black',
      textDecoration: 'none',
    },
    box2: {
      flexGrow: 1,
      display: { xs: 'none', md: 'flex' },
      ml: '15px',
    },
    button: {
      my: 2,
      color: 'black',
      display: 'block',
    },
    noClick: {
      pointerEvents: 'none'
    }
  };
  export default style;