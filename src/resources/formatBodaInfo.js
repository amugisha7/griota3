const formatBodaInfo = (bodasList) => {

    const arrayOfArrays = bodasList.map((obj, index) => {
        const name = `${obj.firstname} ${obj.othername}`;
        const phoneNumber = obj.phoneNumber;
        const numbering = index + 1;
        return [numbering, name, phoneNumber];
      });
    
    return arrayOfArrays
}
export {formatBodaInfo}