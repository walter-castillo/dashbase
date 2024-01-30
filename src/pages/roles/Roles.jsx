
import {data} from './dataroles'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Roles = () => {
	return (
		 <>
            {data.roles.map(role => (
                <Accordion key={role._id}  sx={{ overflow: 'hidden' }}>
                    <AccordionSummary
	                    expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${role._id}-content`}
                        id={`panel-${role._id}-header`}
	                    >
						{role.role}
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {role.permissions.map(permission => (
                                <li key={permission._id}>
                                    {permission.permission}
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
	)
}
