const modeConfig = {
  style: {
    light: {
      backgroundColorHeader: { backgroundColor: '#fff' },
      backgroundColorMain: { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
      backgroundColorSecondary: { backgroundColor: 'fafafa' },
      backgroundColorThree: { backgroundColor: 'transparent' },
      backgroundColorFooter: { backgroundColor: '#fff' },
      backgroundColorModal: { backgroundColor: 'rgba(0, 0, 0, 0.35)' },
      backgroundColorInput: { backgroundColor: '#fff' },
      backgroundColorBlur: { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
      backgroundColorAccent: { backgroundColor: '#fff' },
      backgroundShadow: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
      },
      textColor: { color: '#000' },
    },
    dark: {
      backgroundColorHeader: { backgroundColor: '#050505' },
      backgroundColorMain: { backgroundColor: '#000' },
      backgroundColorSecondary: { backgroundColor: '212121' },
      backgroundColorThree: { backgroundColor: '#fff' },
      backgroundColorFooter: { backgroundColor: '#050505' },
      backgroundColorModal: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
      backgroundColorInput: { backgroundColor: '#f5f5f5' },
      backgroundColorBlur: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
      backgroundColorAccent: { backgroundColor: '#4a56e2' },
      backgroundShadow: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        content: '',
        zIndex: 1,
      },
      textColor: { color: '#fff' },
    },
  },
  themeConfig: {
    light: 'light',
    dark: 'dark',
  },
};

export default modeConfig;
