
async function cloudinaryUploader(event) {
    const cloudName = 'dbqkwb9fx'; //move this to env
    const uploadPreset = 'ml_default'; //this too

    const uploadData = new FormData();
    uploadData.append('file', event.target.files[0]);
    uploadData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });

	if (!response.ok) {
	  throw new Error(`Image upload failed with status: ${response.status}`);
	}
	try {
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error('Error parsing response:', error);
	  throw error;
	}


}

export default cloudinaryUploader