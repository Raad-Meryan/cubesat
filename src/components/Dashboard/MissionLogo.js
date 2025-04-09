import React from 'react';
import missionLogo from '../../assets/SATLOGOT.png';

function MissionLogo() {
	return (
	  <img src={missionLogo} alt="Mission Logo"
      style={{ width: '75%', maxWidth: '300px' }}
    />
  );
}

export default MissionLogo;
