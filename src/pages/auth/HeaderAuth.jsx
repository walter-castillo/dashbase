import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';


export const HeaderAuth = ({  titleHeader }) => {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {import.meta.env.VITE_COMPANY}
      </Typography>
      {titleHeader && ( 
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
         {titleHeader }
        </Typography>
      )}
    </>
  );
};