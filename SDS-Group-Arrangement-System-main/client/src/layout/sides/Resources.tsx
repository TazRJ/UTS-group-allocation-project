import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles'; 

function SideMenu() {
  const theme = useTheme(); 

  const menuItems = [
    { text: 'UTS Library', link: 'https://www.lib.uts.edu.au/' },
    { text: 'Contact Us', link: 'https://www.uts.edu.au/about/contacts/uts-contacts' },
    { text: 'News', link: 'https://www.uts.edu.au/news' },
    { text: 'Staff', link: 'https://www.uts.edu.au/about/faculty-arts-and-social-sciences/faculty-arts-and-social-sciences-staff-contacts/all-staff' },
  ];

  return (
    <div style={{ paddingLeft: '10px' }}>
      <List dense>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            component="a"
            href={item.link}
            style={{ color: theme.palette.primary.main }}
          >
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ style: { fontWeight: 'bold' } }} 
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

export default SideMenu;
