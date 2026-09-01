// Script to set the bot profile picture via Telegram API
const fs = require('fs');
const path = require('path');

const TOKEN = '8600403861:AAHevPaWn8qJz3B3zeNS_sTmAYFsNAIVBXw';

async function setBotPic() {
  const imagePath = path.join(__dirname, 'public', 'botpic.jpg');
  
  if (!fs.existsSync(imagePath)) {
    console.log('No botpic.jpg found in public/');
    return;
  }

  const formData = new FormData();
  formData.append('photo', new Blob([fs.readFileSync(imagePath)]), 'botpic.jpg');

  // Try setUserProfilePhoto (newer API)
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/setUserProfilePhoto`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  console.log('setUserProfilePhoto result:', data);
}

setBotPic();
