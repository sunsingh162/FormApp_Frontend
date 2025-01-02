import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../configuration/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div style={{display: 'flex', marginLeft: '100px'}}>
      <span style={{ marginRight: '10px', marginTop: '10px'}}>Light</span>
    <div
      onClick={handleToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        borderRadius: '20px',
        backgroundColor: theme === 'light' ? '#ccc' : '#0056ff',
        cursor: 'pointer',
        color: theme === 'light' ? '#000' : '#fff',
        width: '66px',
        height: '33px',
        marginTop: '2px'
      }}
    >
      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          transform: theme === 'dark' ? 'translateX(30px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
      ></div>
    </div>
      <span style={{ marginLeft: '10px', marginTop: '10px'}}>Dark</span>
    </div>
  );
};

export default ThemeToggle;
