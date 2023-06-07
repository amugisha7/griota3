export const uploadOneToCloudinary =(file, setUri)=>{

  const formData = new FormData();
  
  let base64Img = `data:image/jpg;base64,${file.assets[0].base64}`
  
  formData.append("upload_preset", "lagiua2k")
  formData.append("file", base64Img);
    fetch('https://api.cloudinary.com/v1_1/djtx8rz4q/upload', {
      body: formData,
      method: "POST", 
    })
    .then(async r => {
      let data = await r.json()
      console.log('cloudinary resp: ', data.secure_url)
      return data.secure_url
    })
    .catch(e =>console.log('cloudinary error: ', e))

}
